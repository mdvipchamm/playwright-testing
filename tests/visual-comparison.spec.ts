import { test } from '@playwright/test';
import pages from '../data/pages';
import { visualComparisonTest } from '../utils/utils';
import {
  DEV,
  DEVLP,
  SB,
  SBLP,
  SB2,
  SUPPORT,
  SUPPORTLP,
  PROD,
  PRODLP
} from '../utils/constants';

// Loop Pages and make tests
if (pages) {
  pages.forEach(async (url) => {
    await visualComparisonTest({
      url: url,
      site1: SUPPORT,
      site2: PROD
    });
  });
}


// https://playwright.dev/docs/api/class-test#test-after-each
test.afterEach(async ({ page }, testInfo) => {
  console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

  if (testInfo.status !== testInfo.expectedStatus)
    console.log(`Did not run as expected, ended up at ${page.url()}`);
});

