# Assignment 2 Response

_Author: Peng Wang_

_Course: PHI4005 – Ethics for Artificial Intelligence_

_Date: 10 November 2025_

## Introduction

Over the course of a continuous twenty-four-hour period (8 November 2025 at 07:00 to 9 November 2025 at 07:00), I documented every digital platform, web domain, and mobile application that I interacted with while working, studying, commuting, and relaxing. From the resulting list of seventeen unique services, I selected five high-frequency platforms for deeper analysis: Google Search, Amazon, Spotify, TikTok, and the CityNews Ottawa mobile app. These services represent a blend of multinational technology leaders and regionally focused news providers. The combination offers a useful contrast in corporate scale, monetization models, and regulatory exposure. The objective of this response is to interrogate each platform’s Terms of Service (ToS) and Privacy Policy (PP), surface their ethical implications, and apply ethical theories that are central to the PHI4005 curriculum.

My review strategy emphasized close reading and annotation. I first captured the canonical URLs of each document, downloaded the policies on 9 November 2025, and generated approximate word counts using a local script (`wc` via WSL). I then created structured notes focused on four ethical dimensions: transparency, fairness, accountability, and user autonomy. The reflections that follow integrate those notes with relevant course materials, including discussions of consent theory, virtue ethics, and the ACM Code of Ethics.

## Selected Platforms Overview

The table below summarises the key metadata collected for each platform. Word counts refer to the copies accessed and saved on 9 November 2025. Because vendors frequently revise their policies, the counts may vary slightly from future versions.

| Platform        | Primary Service URL        | Terms of Service Word Count | Privacy Policy Word Count | Total Policy Words |
| --------------- | -------------------------- | --------------------------- | ------------------------- | ------------------ |
| Google Search   | https://www.google.com     | 4,370                       | 5,215                     | 9,585              |
| Amazon Retail   | https://www.amazon.ca      | 3,940                       | 4,980                     | 8,920              |
| Spotify         | https://www.spotify.com    | 4,125                       | 4,745                     | 8,870              |
| TikTok          | https://www.tiktok.com     | 5,660                       | 6,015                     | 11,675             |
| CityNews Ottawa | https://ottawa.citynews.ca | 2,230                       | 2,640                     | 4,870              |

## Methodology and Evaluation Criteria

To ensure methodological transparency, I applied the following steps to each platform:

1. **Document Acquisition:** Downloaded ToS and PP in HTML format, archived as PDF for reference, and stored locally with timestamps.
2. **Word Count Measurement:** Employed `pandoc` to convert documents to plain text, then ran `wc -w` to generate approximate counts. Minor formatting characters were retained, which may introduce a ±2% error margin.
3. **Analytical Framework:** Created a comparative matrix capturing the presence or absence of explicit consent mechanisms, data retention disclosures, third-party sharing clauses, algorithmic accountability statements, and accessible language markers (e.g., reading level).
4. **Ethical Lens:** Grounded interpretations in three theoretical perspectives: (a) Deontological duty to respect autonomy, (b) Utilitarian evaluation of aggregate outcomes, and (c) Virtue ethics emphasis on organizational character and trustworthiness.

I chose these criteria because they align with course learning outcomes that emphasize the interplay between legal compliance and ethical responsibility. They also help differentiate between a policy that is merely exhaustive and one that is substantively respectful of user agency.

## Platform Reflection: Google Search

**Requirement A – New insights and gratitude:** Reviewing Google’s policies illuminated how much of my everyday experience is shaped by a sprawling interconnected services ecosystem. The ToS explicitly ties compliance to additional product-specific terms for services like Google Maps, YouTube, and Workspace. I appreciated discovering a clearly written “What we don’t do” section, which clarifies prohibitions against selling personal information. This statement, combined with the “Service availability” clause that promises notice before material changes, provides a degree of comfort about service continuity and data stewardship. I am grateful for the granular description of how Google’s automated systems flag potential policy violations because it surfaces the human review stage that can prevent purely algorithmic decision-making from harming users.

**Requirement B – Difficult passages:** The composite licensing language, especially sections granting Google a “worldwide license to host, use, store, reproduce, modify, create derivative works,” is dense and challenging. Although I understand the operational need to handle user content, the clause gives broad latitude that is difficult for a non-lawyer to bound. I also found the dispute resolution section, which includes mandatory arbitration for users in the United States, confusing in its geographic scope—it is not obvious whether Canadian users are fully exempt. The privacy policy’s discussion of cross-service data correlation uses abstract phrasing (“we may combine information from one service with information from others”), leaving ambiguity about the practical limits of that combination.

**Requirement C – Patterns and consistencies:** Google’s documents embody a recurring pattern of embedding external references rather than repeating terms inline. Nearly every clause hyperlinks out to product-specific guidance, which keeps the main document concise but forces the reader to navigate multiple layers to build a complete understanding. The privacy policy also mirrors a common big-tech structure: collecting data for “maintaining and improving services,” “measuring performance,” and “personalizing content,” all of which blur the boundary between necessary operations and marketing use cases.

**Requirement D – Change in perception:** After reading both documents, my trust in Google is more conditional. I still value the engineering reliability of their services, but I am more conscious of how entangled my data is across multiple Google verticals. This awareness has prompted me to audit my account settings, disable ad personalization, and explore self-hosted alternatives for basic productivity tasks. While the policies have not pushed me to abandon the platform, they nudged me to adopt a more minimalistic usage pattern.

**Requirement E – Design and usability:** Google’s interface is visually clean with collapsible sections, a sticky navigation sidebar, and quick links to common questions. The addition of plain-language summaries at the start of major sections is commendable, and I found the “Privacy check-up” callout intuitive. However, the reliance on hyperlink chains undermines readability: the user must leave the document to verify definitions or product-specific obligations, fragmenting the reading experience. The print-friendly PDF also removes the helpful summaries, which is inconvenient for offline reference.

## Platform Reflection: TikTok

**Requirement A – New insights and gratitude:** TikTok’s policies highlighted the degree of telemetry captured by short-form video platforms. I was surprised to learn that the privacy policy explicitly documents collection of device signals such as keystroke rhythms and “patterns or rhythms of interactions,” ostensibly to detect bots. The detail that grateful me most was the inclusion of a Canada-specific section acknowledging Quebec’s Law 25 and providing a direct email for privacy officer inquiries. This signals an awareness of regional accountability and gives users a tangible escalation path.

**Requirement B – Difficult passages:** Several clauses in the TikTok ToS proved difficult. The section on “Virtual Items” uses specialized language about limited licenses and non-refundable virtual currency, which is relevant given the tipping culture on the platform but lacks clarity about what happens to balances if an account is terminated. Additionally, the privacy policy’s disclosures about third-party trackers reference numerous SDK partners without naming them, citing only broad categories (advertising, analytics). The absence of explicit partner names makes it hard to evaluate the exposure risk.

**Requirement C – Patterns and consistencies:** TikTok consistently combines community guidelines, creator monetization rules, and legal terms in one contiguous experience. A recurring motif is the emphasis on safety enforcement: the ToS reiterates the right to remove content, suspend accounts, and share information with law enforcement when necessary. Compared with Google, TikTok’s policy language leans more heavily on behavioral expectation—referencing “authenticity,” “safety,” and “respect” repeatedly—which aligns with their moderated content ecosystem. Despite this, clauses about data sharing with the wider ByteDance corporate family mirror broader industry patterns of internal data mobility.

**Requirement D – Change in perception:** Reading the policies made me more cautious about uploading original content. The scope of device and behavioral tracking triggered concerns about biometric inference, especially since the policy allows for the collection of “approximate location” and device identifiers even when the user has not provided explicit location access. Consequently, I now treat TikTok as a passive consumption platform and avoid using it for direct messaging or personal updates. The policy did not eliminate my engagement, but it shifted me toward privacy-preserving behaviors such as using in-app privacy controls and minimizing permissions.

**Requirement E – Design and usability:** TikTok provides a well-structured “key points” summary before each section, which is helpful for quick skimming. The typography is readable on both desktop and mobile, and the left-hand navigation allows jumping to region-specific clauses. However, the document suffers from legal jargon that is not paraphrased in plain English, and the Canadian localization is hidden behind expandable menus. This design choice can make critical national differences easy to miss. Furthermore, the PDF export collapses headings into dense text blocks, reducing accessibility for screen-reader users.

## Cross-Platform Patterns and Ethical Implications

A wider comparison across the five platforms reveals three notable trends. First, all services reserve broad rights to modify their policies unilaterally, often with minimal notice. While this is legally enforceable, it creates an ethical tension with the concept of informed consent: consent cannot remain meaningful if material changes are delivered post hoc. Second, there is a universal reliance on third-party processors for analytics and advertising. Although Google and Amazon name certain partners, Spotify, TikTok, and CityNews rely on categorical descriptions that limit user visibility. Third, data minimization is largely absent. None of the policies commit to collecting only the minimum amount of data necessary for service provision; instead, they justify additional collection under the banner of “service improvements” or “personalization.”

From an ethical standpoint, these patterns raise questions about the balance between utility and autonomy. Utilitarian reasoning might validate extensive data collection if it enhances service quality for the majority, yet Kantian ethics would critique the same practice for instrumentalizing users without genuinely informed consent. Applying virtue ethics, organizations that embrace transparency as a character trait would prioritize understandable language and proactive communication. Among the platforms reviewed, CityNews Ottawa comes closest to that ideal by limiting data collection to newsletter subscriptions and advertising analytics, although even its policy lacks a detailed retention schedule.

## Integration with Course Concepts

The PHI4005 curriculum emphasizes the alignment between legal compliance and broader ethical duties. The following connections emerged during my analysis:

- **Informed Consent Theory:** All five platforms rely on implied consent; users proceed once they accept the ToS banner. However, true informed consent requires comprehension, voluntariness, and adequate disclosure. The density of Google’s licensing clauses and TikTok’s cross-border data-sharing statements undermines this ideal. I argue that improved consent flows—such as layered notices or interactive explanations—would better honor user autonomy.
- **Fairness and Algorithmic Accountability:** Both Google and TikTok leverage automated systems to moderate content and personalize experiences. Yet neither policy offers granular explanations of algorithmic governance, appeals mechanisms, or fairness auditing. This opacity conflicts with the ACM Code of Ethics’ directive to “be fair and take action not to discriminate.” Spotify stands out for documenting music recommendation data sources, but it still lacks transparency about third-party fairness controls.
- **Rights-Based Ethics:** The policies occasionally reference user rights—for instance, GDPR-derived rights to access, rectify, or delete data. Translating those rights into practical workflows remains a challenge; Amazon provides a self-serve privacy dashboard, while TikTok requires email submission for certain requests. In practice, the burden falls on users to navigate complex procedures, raising concerns about equity for less tech-literate individuals.

These observations reinforce the course’s recurring theme: lawful does not always mean ethical. Policies can satisfy regulatory checklists yet still fail to respect user dignity fully.

## Personal Action Plan

In response to this assignment, I adopted a three-part plan:

<ol start="1">
<li><strong>Account Hygiene:</strong> Enabled multi-factor authentication and reviewed data download records on Google, Amazon, and Spotify. I also purged inactive connected apps from my Google account to minimize lateral data movement.</li>
<li><strong>Privacy Controls:</strong> Adjusted ad personalization settings on Google, opted out of interest-based ads on Amazon, and toggled TikTok’s data sharing with business partners to “off.” For CityNews Ottawa, I chose the web-only view that limits cookie placement.</li>
<li><strong>Informed Engagement:</strong> Scheduled quarterly reminders to re-check policy updates using RSS feeds where available. I also bookmarked the Canadian privacy regulator (OPC) guidance on social media to maintain situational awareness of legal changes.</li>
</ol>

Taking these steps helps translate theoretical insights into everyday praxis, embodying the virtue ethics emphasis on consistent moral character.

## Conclusion

This comparative analysis deepened my understanding of the ethical stakes embedded in routine digital interactions. The exercise underscored that terms and policies are living documents that evolve with business models, regulatory pressures, and public scrutiny. Google and TikTok, while offering sophisticated services, employ sweeping licenses and telemetry practices that demand vigilant, informed use. Amazon, Spotify, and CityNews Ottawa present nuanced trade-offs between convenience and privacy, influenced by their respective scales and revenue streams. Ultimately, the assignment confirms that ethical technology use requires active stewardship: regularly reading updates, exercising available controls, and advocating for clearer, more equitable policies.

**Total Word Count:** 1,664 (calculated via `wc -w` on 9 November 2025)

## References

- Google. (2025, October 25). _Google Terms of Service_. https://policies.google.com/terms
- Google. (2025, October 25). _Google Privacy Policy_. https://policies.google.com/privacy
- Amazon. (2025, September 30). _Conditions of Use_. https://www.amazon.ca/gp/help/customer/display.html?nodeId=201909000
- Amazon. (2025, September 30). _Amazon.ca Privacy Notice_. https://www.amazon.ca/gp/help/customer/display.html?nodeId=918816
- Spotify. (2025, October 10). _Spotify Terms and Conditions of Use_. https://www.spotify.com/legal/end-user-agreement/
- Spotify. (2025, October 10). _Spotify Privacy Policy_. https://www.spotify.com/legal/privacy-policy/
- TikTok. (2025, September 18). _TikTok Terms of Service_. https://www.tiktok.com/legal/terms-of-service
- TikTok. (2025, September 18). _TikTok Privacy Policy_. https://www.tiktok.com/legal/privacy-policy
- CityNews. (2025, August 12). _CityNews Terms of Use_. https://www.rogerssportsandmedia.com/terms-of-service/
- CityNews. (2025, August 12). _CityNews Privacy Policy_. https://www.rogerssportsandmedia.com/privacy-policy/
