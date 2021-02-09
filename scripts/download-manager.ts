type LinkResResolve = (link: string) => void;
type LinkTask = (link: string) => Promise<string>;

export class DownloadManager {
  private downloadingPaths: string[] = [];

  private registeredLinkToResolve: Map<string, LinkResResolve[]> = new Map();

  private registerResult(link: string): Promise<string> {
    return new Promise<string>((r) => {
      const resolves = this.registeredLinkToResolve.get(link);
      if (!!resolves) {
        this.registeredLinkToResolve.set(link, [...resolves, r]);
      } else {
        this.registeredLinkToResolve.set(link, [r]);
      }
    });
  }

  public async startTask(link: string, task: LinkTask): Promise<string> {
    if (this.downloadingPaths.includes(link)) {
      return await this.registerResult(link);
    } else {
      this.downloadingPaths.push(link);
      const res = await task(link);

      const index = this.downloadingPaths.indexOf(link);
      if (index > -1) {
        this.downloadingPaths.splice(index, 1);
      }

      (this.registeredLinkToResolve.get(link) ?? []).forEach((r) => r(res));
      return res;
    }
  }
}
