import * as fs from 'fs'
import { PNG } from 'pngjs'
import { blockRequests } from './blockRequests'
import {
  test,
  expect,
  type Page
} from '@playwright/test'
import {
  PROD
} from './constants'

/* Validate Network Requests.
 *   Make sure the request coming through is not in our blockRequests.
 */
const validateNetworkRequests = async (page: Page) => {
  await page.route('**/*', async (route, request) => {
    let blockRequest = false
    const url = request.url()
    blockRequests.forEach((urlToBlock) => {
      if (url.includes(urlToBlock)) {
        blockRequest = true
        console.log(`[${page.url()}] - Blocking Request ${url}`)
      }
    })
    return (!blockRequest) ? route.continue() : route.abort()
  })
}

/* Generate a Visual Comparison.
 *   https://playwright.dev/docs/test-snapshots
 *   - If URL is not defined will default to homepage '/'.
 *   - If server1 or server2 are not defined they will default to prod.
 *   - If blockRequests is not defined it will default to true.
 *   - Diff is determined by our thresholds set in the configurations below.
 */
export const generateVisualComparison = async (options) => {
  // Setting some default options.
  const url = (options.url) ? options.url : '/'
  const server1 = (options.server1) ? options.server1 : PROD
  const server2 = (options.server2) ? options.server2 : PROD
  const blockNetworkRequests = (options.hasOwnProperty('blockRequests')) ? options.blockRequests : true

  /* Clean the URL, used in naming our test and generating folders.
   *   Set '/' to homepage and strip '/' from any other url
   *   replacing '/' with nothing, playwright will turn that into an underscore.
   */
  const sanitizedUrl = (url === '/') ? 'homepage' : url.replace('/', '')
  test(`${server1} to ${server2} on ${sanitizedUrl}`, async ({ page }) => {
    if (blockNetworkRequests) {
      // Validate network requests for the current page.
      await validateNetworkRequests(page)
    }
    // Navigate to the page.
    await page.goto(`https://${server1}${url}`)
    /* Generate a screenshot for the current page.
     *   https://playwright.dev/docs/test-assertions#locator-assertions-to-have-screenshot-1
     *   - Saves a screenshot to the /test-results folder.
     *   - Generates a diff file based on the settings passed to the toHaveScreenshot method.
     *       In our case we want to compare the full page, so we pass fullPage and
     *       we want to detect the smallest changes, so we set it to a maxDiffPixels of 10.
     */
    await expect(page).toHaveScreenshot(`${server1}-${sanitizedUrl}.png`, {
      maxDiffPixels: 10,
      fullPage: true
    }).then(async () => {
      if (blockNetworkRequests) {
        // Validate network requests for the current page.
        await validateNetworkRequests(page)
      }
      // Navigate to the page we want to compare the previously generated screenshot to.
      await page.goto(`https://www.${server2}${url}`)
      // Temporarily generate a screenshot with the same settings as above 'fullPage'.
      await expect(await page.screenshot({
        fullPage: true
      }))
      /* Expect temp screenshot to match a snapshot.
       *   https://playwright.dev/docs/test-assertions#screenshot-assertions-to-match-snapshot-1
       *   - Compares to the snapshot from the first page with a threshold of 0.2.
       *       threshold - <number> An acceptable perceived color difference in the YIQ color
       *       space between the same pixel in compared images, between zero (strict)
       *       and one (lax), default is configurable with TestConfig.expect.
       *       Defaults to 0.2.
       */
      .toMatchSnapshot(`${server1}-${sanitizedUrl}.png`, {
        threshold: 0.2
      })
    })
  })
}

export const generateDiff = () => {

}


