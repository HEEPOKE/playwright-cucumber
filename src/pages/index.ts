import { Page } from "@playwright/test";
import PlaywrightWrapper from "../helpers/wrapper/PlaywrightWrappers";

class MainAction {
  private base: PlaywrightWrapper;

  constructor(private page: Page) {
    this.base = new PlaywrightWrapper(page);
  }
  
  async goTo(url:string) {
    await this.base.goto(url);
  }
}

export default MainAction;