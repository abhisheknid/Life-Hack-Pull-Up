export type QuestionKey =
  | "how"
  | "when"
  | "howLong"
  | "feel"
  | "win"
  | "spends"
  | "reminders"
  | "hardThing"
  | "objections"
  | "promisedState"
  | "tone";

export type Phase = "Attract" | "Engage" | "Convert" | "Advocate";

export interface JourneyStage {
  id: number;
  name: string;
  summary: string;
  phase: Phase;
  answers: Record<QuestionKey, string>;
}

/** The questions from the whiteboard, in the three columns they were sketched in. */
export const QUESTION_GROUPS: { title: string; questions: { key: QuestionKey; label: string }[] }[] = [
  {
    title: "The moment",
    questions: [
      { key: "how", label: "How?" },
      { key: "when", label: "When?" },
      { key: "howLong", label: "For how long?" },
      { key: "feel", label: "How must it feel?" },
      { key: "win", label: "What's the win?" },
    ],
  },
  {
    title: "The mechanics",
    questions: [
      { key: "spends", label: "Spends?" },
      { key: "reminders", label: "Reminders?" },
      { key: "hardThing", label: "Hard thing to crack here?" },
    ],
  },
  {
    title: "The mindset",
    questions: [
      { key: "objections", label: "Objections by users?" },
      { key: "promisedState", label: "Promised state?" },
      { key: "tone", label: "Tone & urgency" },
    ],
  },
];

export const INSTAGRAM_ACCOUNTS = [
  {
    code: "IG2",
    title: "Relationships",
    cohort: "User cohort 1",
    handle: "@reltag",
    note: "Handle TBD: something that signals relationships.",
    locked: false,
  },
  {
    code: "IG1",
    title: "Main",
    cohort: "Life + accolades (Rel + Mo + Self)",
    handle: "@ashikamehta",
    note: "Locked in.",
    locked: true,
  },
  {
    code: "IG3",
    title: "Motherhood",
    cohort: "User cohort 2",
    handle: "@motag",
    note: "Handle TBD: something that signals motherhood.",
    locked: false,
  },
];

export const JOURNEY: JourneyStage[] = [
  {
    id: 1,
    name: "Discovery",
    summary: "First time Ashika crosses someone's feed.",
    phase: "Attract",
    answers: {
      how: "Reels from all three accounts reaching Explore, collabs with creators in the relationship and parenting space, podcast guest spots, and small paid boosts on reels that are already performing well.",
      when: "Evening scroll (9 to 11pm) for couples. Nap-time and early-morning windows for mothers.",
      howLong: "1 to 3 seconds to earn the stop, and a 15 to 30 second reel to earn the watch.",
      feel: "\"Wait, that's me.\" A small jolt of recognition, not a lecture.",
      win: "They watch past 3 seconds, then save, share or tap through to the profile.",
      spends: "Low to medium: collab fees, a small daily boost budget on proven hooks, and editing time.",
      reminders: "None yet, because there's no relationship. Repetition does the job: the same theme posted 3 to 5 times across accounts in different formats.",
      hardThing: "Standing out in a feed full of relationship and parenting advice creators, with hooks that grab without being clickbait.",
      objections: "\"Another guru.\" \"Is this just motivational fluff?\"",
      promisedState: "Someone finally understands what's happening in my relationship or my home.",
      tone: "Warm, with a sharp hook. Zero urgency; curiosity only.",
    },
  },
  {
    id: 2,
    name: "Awareness",
    summary: "They know who Ashika is and what she stands for.",
    phase: "Attract",
    answers: {
      how: "Repeated exposure: a pinned intro reel, a bio that says exactly who she helps, and carousels that name the problem.",
      when: "The first 1 to 2 weeks after discovery.",
      howLong: "About 7 touches over roughly 14 days.",
      feel: "Familiar. \"I keep seeing her, and she gets it.\"",
      win: "They can explain what Ashika does in one line, visit the profile, and find the account meant for them.",
      spends: "Low: retargeting ads to people who watched 50% or more of a video, plus content production.",
      reminders: "Retargeting ads, story reshares of top posts, and cross-account tagging.",
      hardThing: "Staying memorable across three handles without confusing people about which account is for them.",
      objections: "\"Which account is for me?\" \"What does she actually offer?\"",
      promisedState: "Clarity: what I'm going through has a name, and someone is working on it.",
      tone: "Clear and consistent. Still no urgency.",
    },
  },
  {
    id: 3,
    name: "Credibility",
    summary: "Why should they trust her?",
    phase: "Attract",
    answers: {
      how: "Accolades on the main account (awards, press, credentials), Ashika's own story, client testimonials, collabs with experts, and \"Press\" and \"Wins\" highlights.",
      when: "The moment they visit the profile: the first 10 seconds on the grid and highlights.",
      howLong: "A 10 to 30 second profile scan, then deepening over the following days.",
      feel: "Reassured. \"She's the real deal, not just talk.\"",
      win: "A follow, or a deep dive into the highlights.",
      spends: "Medium: PR and press features, photography, and testimonial video production.",
      reminders: "Pinned proof posts, and retargeting profile visitors with testimonial ads.",
      hardThing: "Showing accolades without sounding boastful, and getting proof on sensitive topics where clients don't want to be named (use anonymised testimonials).",
      objections: "\"What qualifies her?\" \"Will this work for someone like me, with my culture and family setup?\"",
      promisedState: "I'm in safe, qualified hands.",
      tone: "Confident but humble, and backed by evidence.",
    },
  },
  {
    id: 4,
    name: "Followership",
    summary: "They follow, and they keep coming back.",
    phase: "Engage",
    answers: {
      how: "Follow CTAs in reels, a consistent posting schedule, named series (e.g. \"Tuesday Truths\"), a broadcast channel, and close-friends stories.",
      when: "Right after a high-value post or a profile visit.",
      howLong: "Ongoing. The first interaction should happen within 7 days of following.",
      feel: "Belonging. \"This is my corner of Instagram.\"",
      win: "A follow of the right niche handle, plus a first like, comment or story reply within 7 days.",
      spends: "Content team and community management time.",
      reminders: "Broadcast channel pings, story polls and question boxes, and \"turn on notifications\" nudges.",
      hardThing: "Getting past algorithm suppression and feed fatigue, and avoiding the quiet mute.",
      objections: "\"My partner or family might see that I follow this.\" Privacy matters most for the relationships account.",
      promisedState: "Small, regular doses of help that actually fit into my life.",
      tone: "Friendly, reliable and conversational.",
    },
  },
  {
    id: 5,
    name: "Curiosity",
    summary: "They want to know more than the free content gives.",
    phase: "Engage",
    answers: {
      how: "Open loops and part-2 series, teasers of the course frameworks, a free lead magnet (e.g. a \"What's your conflict style?\" quiz), and DM keyword automation into email or WhatsApp.",
      when: "Weeks 2 to 4 after following.",
      howLong: "1 to 3 weeks.",
      feel: "Intrigued. \"There's a method here, and I want the full picture.\"",
      win: "A lead captured: email or WhatsApp opt-in, a completed quiz, or a DM keyword.",
      spends: "Low to medium: creating the lead magnet, plus DM automation and email tools.",
      reminders: "DM automation follow-ups and a 3 to 5 email welcome sequence.",
      hardThing: "Moving people off Instagram and onto a channel Ashika owns.",
      objections: "\"Will I get spammed?\" \"Is the free thing just a sales pitch?\"",
      promisedState: "A glimpse of the method that could fix this.",
      tone: "Playful and teasing, with light urgency from limited-time freebies.",
    },
  },
  {
    id: 6,
    name: "High Relevance",
    summary: "\"This is exactly for me.\"",
    phase: "Engage",
    answers: {
      how: "Cohort-specific content (the relationships account for cohort 1, the motherhood account for cohort 2), leads segmented by quiz answer, personalised emails, and live Q&As on specific scenarios.",
      when: "Days 1 to 14 after the lead is captured.",
      howLong: "1 to 2 weeks.",
      feel: "Seen, specifically. \"She's describing my Tuesday night.\"",
      win: "They pick a cohort, reply to an email, or attend a live.",
      spends: "Medium: segmentation setup and time for live sessions.",
      reminders: "Live session reminders at 24 hours, 1 hour and 10 minutes, on WhatsApp and email.",
      hardThing: "Getting specific enough without spreading content too thin across two cohorts.",
      objections: "\"My situation is different or more complicated.\" \"I'm not married.\" \"My kids are older.\"",
      promisedState: "A path built for my exact situation.",
      tone: "Empathetic, specific and intimate.",
    },
  },
  {
    id: 7,
    name: "Entertainment Value",
    summary: "They enjoy it, so they stick around.",
    phase: "Engage",
    answers: {
      how: "Humour, relatable skits, couple and parent memes, behind-the-scenes of Ashika's own life, trends and storytelling, mostly on the main account.",
      when: "Throughout, mixed in with teaching (roughly 1 in 3 posts).",
      howLong: "Ongoing. It keeps warm leads warm through a 2 to 6 week consideration window.",
      feel: "Delight. \"I'd watch her even if I didn't need help.\"",
      win: "Sends to a partner or friend, repeat views and DMs.",
      spends: "Creative production, plus editors fast enough to catch trends.",
      reminders: "None needed, because shareability is the reminder. Use \"send this to…\" CTAs.",
      hardThing: "Staying fun without undercutting authority on serious topics like conflict or postpartum struggles.",
      objections: "\"Is she just an influencer?\"",
      promisedState: "This journey doesn't have to feel heavy.",
      tone: "Fun and warm. Low urgency.",
    },
  },
  {
    id: 8,
    name: "Course Buy-In",
    summary: "They buy the course.",
    phase: "Convert",
    answers: {
      how: "A masterclass or webinar that leads to a sales page with the curriculum, testimonials, a guarantee and EMI options. Separate courses per cohort, and DM sales for higher-ticket offers.",
      when: "Launch windows (e.g. quarterly), or evergreen after the webinar. Time pushes around paydays (1st to 5th of the month).",
      howLong: "A 5 to 10 day cart window, with most decisions made within 72 hours of the webinar.",
      feel: "Confident and excited, not pressured. \"This is an investment in us, or in me.\"",
      win: "A purchase, and onboarding started within 24 hours.",
      spends: "Highest-spend stage: ads for webinar sign-ups, the sales page, payment gateway fees and the DM sales team.",
      reminders: "Cart open and close emails, WhatsApp, webinar replays, abandoned-checkout nudges and countdown stories.",
      hardThing: "Price, and getting the partner on board for the relationships course. For mothers, the guilt of spending on themselves.",
      objections: "\"Too expensive.\" \"No time.\" \"My partner won't do it.\" \"Will it work for me?\" \"Can I get a refund?\"",
      promisedState: "A clear, guided transformation within a set number of weeks.",
      tone: "Assured. Highest urgency (deadlines and bonuses), but always honest.",
    },
  },
  {
    id: 9,
    name: "Course Completion",
    summary: "They finish, and they see the change.",
    phase: "Convert",
    answers: {
      how: "Bite-sized lessons (10 to 15 minutes), weekly live calls, a community group, accountability buddies, progress tracking, milestone celebrations and a certificate.",
      when: "The course weeks. Weeks 2 to 3 are where people drop off.",
      howLong: "The length of the course (e.g. 4 to 8 weeks).",
      feel: "Progress and momentum. \"A small win every week.\"",
      win: "80% or more completion, a visible change (fewer fights, calmer mornings) and a milestone worth sharing.",
      spends: "Community management, live coaching time and the course platform cost.",
      reminders: "Weekly lesson drops, missed-lesson nudges, buddy check-ins on WhatsApp and live call reminders.",
      hardThing: "Online courses have notoriously low completion rates, and busy mothers and couples lose momentum.",
      objections: "\"I fell behind, so what's the point?\" \"My partner stopped doing it.\"",
      promisedState: "The transformation promised on the sales page is real, and I can feel it.",
      tone: "Encouraging and celebratory, with gentle urgency (\"this week's lesson is only 12 minutes\").",
    },
  },
  {
    id: 10,
    name: "Review",
    summary: "Trustpilot and Google Reviews.",
    phase: "Advocate",
    answers: {
      how: "Ask at the emotional peak (a milestone or the final session), with one-tap links, easy prompts and invitations to record a video testimonial.",
      when: "Right after a win: the mid-course milestone and completion day.",
      howLong: "A 2-minute ask, with the review written within 48 hours.",
      feel: "Proud and generous. \"I want others to know this worked.\"",
      win: "A public review on Trustpilot or Google, and consent to use a video testimonial.",
      spends: "Low. Trustpilot and Google don't allow paid or incentivised reviews, so spend goes on making reviewing effortless instead.",
      reminders: "At most two, by email and WhatsApp, at 48 hours and at 7 days.",
      hardThing: "Privacy: people don't want to review a relationship course under their real name. It's also hard to motivate reviews without incentives.",
      objections: "\"I don't want my name on it.\" \"I don't have time.\"",
      promisedState: "My story will help someone like me.",
      tone: "Grateful and low-pressure.",
    },
  },
  {
    id: 11,
    name: "Evangelism + Referral",
    summary: "They bring others in.",
    phase: "Advocate",
    answers: {
      how: "A give-get referral programme, an alumni community, an ambassador programme, alumni stories featured on the accounts, and gift-a-course for friends, sisters and couple friends.",
      when: "2 to 8 weeks after completion, and again at every launch.",
      howLong: "A lifetime relationship.",
      feel: "Pride and identity. \"I'm part of Ashika's community, and I recommend her.\"",
      win: "Every graduate refers at least one person, and alumni buy the next course (cross-sell between relationships and motherhood).",
      spends: "Referral rewards or commission, alumni events and merch.",
      reminders: "Referral link reminders at each launch, alumni-only lives and course-anniversary messages.",
      hardThing: "Stigma: recommending a relationship course can suggest \"my marriage had problems\".",
      objections: "\"It feels awkward to recommend this.\"",
      promisedState: "I'm the friend who helped.",
      tone: "Celebratory and insider-y, with gentle urgency tied to launches.",
    },
  },
];
