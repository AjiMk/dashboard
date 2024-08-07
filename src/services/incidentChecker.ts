import { CVERegister } from "../models/cveRegister";
import Site, { ISiteInfo } from "../models/site";
import IncidentReport from "../models/incidentReport";
import axios from "axios";

export default class IncidentChecker {
  constructor(public cveRegister: CVERegister) {}

  public async check() {
    const sites = await Site.find({ tags: this.cveRegister.tags });

    for (let i = 0; i < sites.length; i++) {
      const site = sites[i];
      const insertData = {
        website: site.website,
        server: site.server,
        cve_id: this.cveRegister.cveMetadata?.cveId as string,
        tags: this.cveRegister.tags as string[],
      };

      await IncidentReport.create(insertData);
    }

    const siteDetails = sites.map((site: ISiteInfo, index: number) => {
      return `
  #### ${index + 1}. **Website Name:** ${site.website}

  - **URL:** [${site.url}](${site.url})
  - **Tags:** ${site.tags.join(", ")}
      `;
    });

    const message = `
      # ⚠️ CVE Alert Notification ⚠️

  ## Attention Required: Website Security Checkup Needed

  Hello,

  Our system has detected that the following websites need to be checked against the latest CVE (Common Vulnerabilities and Exposures) updates to ensure they are secure and up-to-date.

  ### Websites Requiring Attention
${siteDetails}

  ### Recommended Actions

  1. **Review Latest CVEs:** Check the latest CVE entries related to your server and software.
  2. **Update Software:** Ensure all server software is up-to-date with the latest security patches.
  3. **Perform Security Audit:** Conduct a comprehensive security audit to identify and mitigate potential vulnerabilities.
  4. **Monitor Regularly:** Set up regular monitoring and alerts for new CVE entries affecting your servers and applications.

  ### How to Get Started

  - **Review CVEs:** Use the CVE Alert Bot to fetch the latest CVE details by typing \`latest\`.
  - **Search Specific CVEs:** Look up specific CVE IDs using \`search [CVE-ID]\`.
  - **Get Help:** If you need assistance, type \`help\` to learn more about using the bot's features.

  Keeping your websites secure is crucial to protect your data and users. Please prioritize these actions to maintain the integrity of your systems.

  If you have any questions or need further assistance, feel free to reach out.

  Stay safe and secure,
  **CVE Alert Bot Team**`;

    const url = "http://localhost:3978/api/notify";
    await axios.post(url, {
      message: message,
    });
  }
}
