import { mutation } from "./_generated/server";

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + "mikey-salt");
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("shorts").first();
    if (existing) return { seeded: false, reason: "already seeded" };

    const shorts = [
      { title: "DARK MODE", duration: "0:15", views: "1.1M", platform: "IG", src: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=400&auto=format&fit=crop", url: "https://www.instagram.com/reel/DZhutc0sH3K/?igsh=a2I4dmZmeHc4ZWg3" },
      { title: "CYBER PULSE", duration: "0:18", views: "940K", platform: "IG", src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400&auto=format&fit=crop", url: "https://www.instagram.com/reel/DXlxxGBjLt5/?igsh=MXcybWV2ZjN1aGZh" },
      { title: "أغرب مواقع في العالم ! 🌍😂", duration: "0:12", views: "107K", platform: "YT#", src: "https://img.youtube.com/vi/LMbtAZPgMrg/maxresdefault.jpg", url: "https://youtube.com/shorts/LMbtAZPgMrg?si=YCVaAP5GLdinwQ3w" },
      { title: "كنت على وشك أخسر في اللعبة... 🤯🔥", duration: "0:10", views: "4.2M", platform: "TK", src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=400&auto=format&fit=crop", url: "https://vt.tiktok.com/ZSCHP1k2r/" },
      { title: "NEO SOUL", duration: "0:20", views: "670K", platform: "IG", src: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=400&auto=format&fit=crop", url: "https://www.instagram.com/reel/DRsH0WzE2qu/?igsh=bWhidXhjMmhtN3Jh" },
      { title: "DIGITAL DROP", duration: "0:14", views: "1.6M", platform: "IG", src: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=400&auto=format&fit=crop", url: "https://www.instagram.com/reel/DUdmGENEwng/?igsh=MTZpYmdnZDZ4OXF4cw==" },
      { title: "MOTION BLUR", duration: "0:22", views: "820K", platform: "IG", src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400&auto=format&fit=crop", url: "https://www.instagram.com/reel/DXKJP8JDYtk/?igsh=b3B3eHV5Mnd2MTNn" },
      { title: "#سكاي_سول #اكسبلور #تحدي #ابو_فله", duration: "0:16", views: "86K", platform: "YT#", src: "https://img.youtube.com/vi/5li3SH-13lg/maxresdefault.jpg", url: "https://youtube.com/shorts/5li3SH-13lg?si=-Y79TdFfu5V9gmRt" },
      { title: "NIGHT RUN", duration: "0:19", views: "1.4M", platform: "IG", src: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=400&auto=format&fit=crop", url: "https://www.instagram.com/reel/DYcXqYXM84S/?igsh=MW9reG9mazI4YmM4dg==" }
    ];
    for (const item of shorts) {
      await ctx.db.insert("shorts", item);
    }

    const projects = [
      { id: "r3rzDNVpuUE", title: "اكلات الانمي | هجوم العمالقة مع عمر عبدالرحمن !!", category: "entertainment", duration: "14:00", aspect: "Standard / 16:9", channel: "AZAMSENPAI", channelUrl: "AZAMSENPAI", channelLogo: "https://yt3.ggpht.com/_Xccleql4bRNPLqv3BJdf7x3Mpqsk9UPds0nx3My-bK0EqpULwAX9o6ulr3XOifCiTqFwuh9iCo=s800-c-k-c0x00ffffff-no-rj", meta: "YouTube // 1080p", desc: "Anime food tasting experience with Omar Abdulrahman - trying dishes from Attack on Titan.", preview: "https://img.youtube.com/vi/r3rzDNVpuUE/maxresdefault.jpg", videoUrl: "https://youtu.be/r3rzDNVpuUE?si=tCT1uQAi1xj5P0y2", views: "1.2M views", date: "2 months ago" },
      { id: "AAVoF_1wPAA", title: "جربت اغرب منتجات اليابان مع تاحو !!", category: "entertainment", duration: "16:00", aspect: "Standard / 16:9", channel: "AZAMSENPAI", channelUrl: "AZAMSENPAI", channelLogo: "https://yt3.ggpht.com/_Xccleql4bRNPLqv3BJdf7x3Mpqsk9UPds0nx3My-bK0EqpULwAX9o6ulr3XOifCiTqFwuh9iCo=s800-c-k-c0x00ffffff-no-rj", meta: "YouTube // 1080p", desc: "Testing the strangest Japanese products with Taho - weird gadgets and snacks from Japan.", preview: "https://img.youtube.com/vi/AAVoF_1wPAA/maxresdefault.jpg", videoUrl: "https://youtu.be/AAVoF_1wPAA?si=MbDPA05Gn-VnVh_o", views: "980K views", date: "3 weeks ago" },
      { id: "mNhbYjht0W8", title: "جربت أغرب 5 فنادق في العالم 😨💔!!", category: "entertainment", duration: "18:00", aspect: "Standard / 16:9", channel: "AZAMSENPAI", channelUrl: "AZAMSENPAI", channelLogo: "https://yt3.ggpht.com/_Xccleql4bRNPLqv3BJdf7x3Mpqsk9UPds0nx3My-bK0EqpULwAX9o6ulr3XOifCiTqFwuh9iCo=s800-c-k-c0x00ffffff-no-rj", meta: "YouTube // 1080p", desc: "Exploring the 5 weirdest hotels around the world - unique and bizarre accommodations.", preview: "https://img.youtube.com/vi/mNhbYjht0W8/maxresdefault.jpg", videoUrl: "https://youtu.be/mNhbYjht0W8?si=hNzY9y-ipa7-iAgY", views: "2.1M views", date: "1 month ago" },
      { id: "QFuBZJTpQ7Q", title: "جربت فعاليات اليابان القديمة vs اليابان الجديدة", category: "entertainment", duration: "20:00", aspect: "Standard / 16:9", channel: "AZAMSENPAI", channelUrl: "AZAMSENPAI", channelLogo: "https://yt3.ggpht.com/_Xccleql4bRNPLqv3BJdf7x3Mpqsk9UPds0nx3My-bK0EqpULwAX9o6ulr3XOifCiTqFwuh9iCo=s800-c-k-c0x00ffffff-no-rj", meta: "YouTube // 1080p", desc: "Comparing old Japan vs new Japan events and festivals - a cultural time travel experience.", preview: "https://img.youtube.com/vi/QFuBZJTpQ7Q/maxresdefault.jpg", videoUrl: "https://youtu.be/QFuBZJTpQ7Q?si=nkoh7MNVv0UbiuNg", views: "850K views", date: "1 month ago" },
      { id: "cwm-49jveIQ", title: "كشفت لكم السر الذي خبأته عنكم!", category: "entertainment", duration: "12:00", aspect: "Standard / 16:9", channel: "AniMates", channelUrl: "itsanimates", channelLogo: "https://yt3.ggpht.com/o8mvguy4NjoXm3dQxREqGjzkxNgazyvDQr0V0lzk2gkFvukg27zPVyHYtasV1GMRfko_PT69Kus=s800-c-k-c0x00ffffff-no-rj", meta: "YouTube // 1080p", desc: "Finally revealing the secret that was hidden from everyone - a personal story reveal.", preview: "https://img.youtube.com/vi/cwm-49jveIQ/maxresdefault.jpg", videoUrl: "https://youtu.be/cwm-49jveIQ?si=JnOVY__Q3rDGqULN", views: "3.5M views", date: "1 week ago" },
      { id: "3LvK-sv9gIY", title: "شرح وتحليل السيرك الرقمي المدهش - الحلقة 1", category: "review", duration: "22:00", aspect: "Standard / 16:9", channel: "AniMates", channelUrl: "itsanimates", channelLogo: "https://yt3.ggpht.com/o8mvguy4NjoXm3dQxREqGjzkxNgazyvDQr0V0lzk2gkFvukg27zPVyHYtasV1GMRfko_PT69Kus=s800-c-k-c0x00ffffff-no-rj", meta: "YouTube // 1080p", desc: "In-depth analysis and explanation of The Amazing Digital Circus - Episode 1 breakdown.", preview: "https://img.youtube.com/vi/3LvK-sv9gIY/maxresdefault.jpg", videoUrl: "https://youtu.be/3LvK-sv9gIY?si=UrgrRRs1BMx-Q5GF", views: "1.8M views", date: "2 weeks ago" },
      { id: "MjU0bR-7gUw", title: "مراجعة وتحليل وقت المغامرة | فيونا وكايك | الحلقة التاسعة والعاشرة #5", category: "review", duration: "25:00", aspect: "Standard / 16:9", channel: "AniMates", channelUrl: "itsanimates", channelLogo: "https://yt3.ggpht.com/o8mvguy4NjoXm3dQxREqGjzkxNgazyvDQr0V0lzk2gkFvukg27zPVyHYtasV1GMRfko_PT69Kus=s800-c-k-c0x00ffffff-no-rj", meta: "YouTube // 1080p", desc: "Adventure Time Fiona and Cake review - Episodes 9 & 10 analysis and breakdown part 5.", preview: "https://img.youtube.com/vi/MjU0bR-7gUw/maxresdefault.jpg", videoUrl: "https://youtu.be/MjU0bR-7gUw?si=EwuefPhBVYT_Hf0m", views: "620K views", date: "3 months ago" },
      { id: "h2zaxmWQQ_o", title: "لايرز بار الحياة الواقعية | طاولة الموت💀 (مع شباب فالكونز💚)", category: "entertainment", duration: "15:00", aspect: "Standard / 16:9", channel: "عادل 3ADEL l", channelUrl: "3AdeIL", channelLogo: "https://yt3.ggpht.com/A2LjXmePQ2dm6RwQJWNHTLwaxj1_Rvcsipe7vNtQH-OGkid0kEOfj8diURPlx6CC7WZm1pbNMA=s800-c-k-c0x00ffffff-no-rj", meta: "YouTube // 1080p", desc: "Layers Bar in real life - Death Table challenge with the Falcons crew - extreme food challenge.", preview: "https://img.youtube.com/vi/h2zaxmWQQ_o/maxresdefault.jpg", videoUrl: "https://youtu.be/h2zaxmWQQ_o?si=6u_qcBwxgtplXr-2", views: "4.2M views", date: "1 month ago" },
      { id: "89JHq9RV4Co", title: "جريمة في المطبخ", category: "entertainment", duration: "13:00", aspect: "Standard / 16:9", channel: "عادل 3ADEL l", channelUrl: "3AdeIL", channelLogo: "https://yt3.ggpht.com/A2LjXmePQ2dm6RwQJWNHTLwaxj1_Rvcsipe7vNtQH-OGkid0kEOfj8diURPlx6CC7WZm1pbNMA=s800-c-k-c0x00ffffff-no-rj", meta: "YouTube // 1080p", desc: "A crime mystery unfolds in the kitchen - cooking gone wrong with hilarious consequences.", preview: "https://img.youtube.com/vi/89JHq9RV4Co/maxresdefault.jpg", videoUrl: "https://youtu.be/89JHq9RV4Co?si=3UO1j8RL8JJt45pC", views: "2.7M views", date: "2 weeks ago" },
    ];
    for (const item of projects) {
      await ctx.db.insert("projects", item);
    }

    const longFormProjects = [
      { id: 9, title: "اكلات الانمي | هجوم العمالقة مع عمر عبدالرحمن !!", category: "entertainment", duration: "14:00", aspect: "Standard / 16:9", meta: "YouTube // 1080p", desc: "Anime food tasting experience with Omar Abdulrahman - trying dishes from Attack on Titan.", preview: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=640&auto=format&fit=crop", videoUrl: "https://youtu.be/r3rzDNVpuUE?si=tCT1uQAi1xj5P0y2" },
      { id: 10, title: "جربت اغرب منتجات اليابان مع تاحو !!", category: "entertainment", duration: "16:00", aspect: "Standard / 16:9", meta: "YouTube // 1080p", desc: "Testing the strangest Japanese products with Taho - weird gadgets and snacks from Japan.", preview: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=640&auto=format&fit=crop", videoUrl: "https://youtu.be/AAVoF_1wPAA?si=MbDPA05Gn-VnVh_o" },
      { id: 11, title: "جربت أغرب 5 فنادق في العالم 😨💔!!", category: "entertainment", duration: "18:00", aspect: "Standard / 16:9", meta: "YouTube // 1080p", desc: "Exploring the 5 weirdest hotels around the world - unique and bizarre accommodations.", preview: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=640&auto=format&fit=crop", videoUrl: "https://youtu.be/mNhbYjht0W8?si=hNzY9y-ipa7-iAgY" },
      { id: 12, title: "جربت فعاليات اليابان القديمة vs اليابان الجديدة", category: "entertainment", duration: "20:00", aspect: "Standard / 16:9", meta: "YouTube // 1080p", desc: "Comparing old Japan vs new Japan events and festivals - a cultural time travel experience.", preview: "https://images.unsplash.com/photo-1528164344705-47542687000d?q=80&w=640&auto=format&fit=crop", videoUrl: "https://youtu.be/QFuBZJTpQ7Q?si=nkoh7MNVv0UbiuNg" },
      { id: 13, title: "كشفت لكم السر الذي خبأته عنكم!", category: "entertainment", duration: "12:00", aspect: "Standard / 16:9", meta: "YouTube // 1080p", desc: "Finally revealing the secret that was hidden from everyone - a personal story reveal.", preview: "https://images.unsplash.com/photo-1572947650440-e8a97ef053b2?q=80&w=640&auto=format&fit=crop", videoUrl: "https://youtu.be/cwm-49jveIQ?si=JnOVY__Q3rDGqULN" },
      { id: 14, title: "شرح وتحليل السيرك الرقمي المدهش - الحلقة 1", category: "review", duration: "22:00", aspect: "Standard / 16:9", meta: "YouTube // 1080p", desc: "In-depth analysis and explanation of The Amazing Digital Circus - Episode 1 breakdown.", preview: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=640&auto=format&fit=crop", videoUrl: "https://youtu.be/3LvK-sv9gIY?si=UrgrRRs1BMx-Q5GF" },
      { id: 15, title: "مراجعة وتحليل وقت المغامرة | فيونا وكايك | الحلقة التاسعة والعاشرة #5", category: "review", duration: "25:00", aspect: "Standard / 16:9", meta: "YouTube // 1080p", desc: "Adventure Time Fiona and Cake review - Episodes 9 & 10 analysis and breakdown part 5.", preview: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=640&auto=format&fit=crop", videoUrl: "https://youtu.be/MjU0bR-7gUw?si=EwuefPhBVYT_Hf0m" },
      { id: 16, title: "لايرز بار الحياة الواقعية | طاولة الموت💀 (مع شباب فالكونز💚)", category: "entertainment", duration: "15:00", aspect: "Standard / 16:9", meta: "YouTube // 1080p", desc: "Layers Bar in real life - Death Table challenge with the Falcons crew - extreme food challenge.", preview: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=640&auto=format&fit=crop", videoUrl: "https://youtu.be/h2zaxmWQQ_o?si=6u_qcBwxgtplXr-2" },
      { id: 17, title: "جريمة في المطبخ", category: "entertainment", duration: "13:00", aspect: "Standard / 16:9", meta: "YouTube // 1080p", desc: "A crime mystery unfolds in the kitchen - cooking gone wrong with hilarious consequences.", preview: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=640&auto=format&fit=crop", videoUrl: "https://youtu.be/89JHq9RV4Co?si=3UO1j8RL8JJt45pC" },
    ];
    for (const item of longFormProjects) {
      await ctx.db.insert("longFormProjects", item);
    }

    const reviews = [
      { quote: "Working with Mikey from 2022 to 2025 has been one of the best decisions I've made for my YouTube channel. He adapted to new styles almost immediately and often improved upon the original idea. His work elevated the production value, attracting more viewers and holding their attention longer.", author: "ABDULRAHMAN ALTAYEB", role: "AniMates", rating: 5, logo: "https://yt3.ggpht.com/o8mvguy4NjoXm3dQxREqGjzkxNgazyvDQr0V0lzk2gkFvukg27zPVyHYtasV1GMRfko_PT69Kus=s800-c-k-c0x00ffffff-no-rj" },
      { quote: "I've been working with Mikey on my Shorts for almost two years now. His editing is literally next level and has played a big role in helping me work with major brands. They're always impressed with the quality.", author: "BASHARKK", role: "Basharkk", rating: 5, logo: "https://yt3.ggpht.com/quWaWwkn0-azJjXaMGd9fH6mn9wdptAGAJb8eaBlfSmobUWosi8nv4hO7ZQC7QIDmD-ZAGhA8w=s800-c-k-c0x00ffffff-no-rj" },
      { quote: "Outstanding work that has raised the editing standards on my channel.", author: "مصعب يحيى", role: "مصعب يحيى", rating: 5, logo: "https://yt3.ggpht.com/w0xJGLmuACc4jWFWZ0BZRIvq7xqa2x5O1ITmXRnhzGDTN_SVWdGZElMfPLKVTucS2X8vjIUm=s800-c-k-c0x00ffffff-no-rj" },
    ];
    for (const item of reviews) {
      await ctx.db.insert("reviews", item);
    }

    const channels = [
      { name: "AZAMSENPAI", views: "", logo: "https://yt3.ggpht.com/_Xccleql4bRNPLqv3BJdf7x3Mpqsk9UPds0nx3My-bK0EqpULwAX9o6ulr3XOifCiTqFwuh9iCo=s800-c-k-c0x00ffffff-no-rj", url: "https://www.youtube.com/@AZAMSENPAI" },
      { name: " 3ADEL l عادل", views: "", logo: "https://yt3.ggpht.com/A2LjXmePQ2dm6RwQJWNHTLwaxj1_Rvcsipe7vNtQH-OGkid0kEOfj8diURPlx6CC7WZm1pbNMA=s800-c-k-c0x00ffffff-no-rj", url: "https://www.youtube.com/@3AdeIL" },
      { name: "Basharkk", views: "", logo: "https://yt3.ggpht.com/quWaWwkn0-azJjXaMGd9fH6mn9wdptAGAJb8eaBlfSmobUWosi8nv4hO7ZQC7QIDmD-ZAGhA8w=s800-c-k-c0x00ffffff-no-rj", url: "https://www.youtube.com/@Basharkk" },
      { name: "skysoul سكاي سول", views: "", logo: "https://yt3.ggpht.com/JRCkzOrByqUYVdYasYPRHsVgAzK0ro8369Ar8C656WoabmyeR23Nnnjunrkb60N6CVa2AtLJqQ=s800-c-k-c0x00ffffff-no-rj", url: "https://www.youtube.com/@skysoul" },
      { name: "Reybad - ريباد", views: "", logo: "https://yt3.ggpht.com/ytc/AIdro_nDvQy0427doP8bmW_hQ2by1lrWuCN6Vq1dAGbZ2wHaQ-M=s800-c-k-c0x00ffffff-no-rj", url: "https://www.youtube.com/@reybad" },
      { name: "AniMates", views: "", logo: "https://yt3.ggpht.com/o8mvguy4NjoXm3dQxREqGjzkxNgazyvDQr0V0lzk2gkFvukg27zPVyHYtasV1GMRfko_PT69Kus=s800-c-k-c0x00ffffff-no-rj", url: "https://www.youtube.com/@itsanimates" },
      { name: "مصعب يحيى", views: "", logo: "https://yt3.ggpht.com/w0xJGLmuACc4jWFWZ0BZRIvq7xqa2x5O1ITmXRnhzGDTN_SVWdGZElMfPLKVTucS2X8vjIUm=s240-c-k-c0x00ffffff-no-rj", url: "https://www.youtube.com/@ay_shay" },
    ];
    for (const item of channels) {
      await ctx.db.insert("channels", item);
    }

    const faq = [
      { q: "What raw footage transfer patterns do you work with?", a: "I work primarily with cloud file synchronization networks (Frame.io, MASV, Google Drive Enterprise) or direct hardware shipping routes for deep-tier multi-terabyte editing projects. Proxy setups are completed immediately upon ingestion." },
      { q: "Can you take over project files started by separate editors?", a: "Yes. I can ingest standard XML sheets, EDL timelines, or Premiere Pro projects (with full source assets mapped). This allows clear project migration without losing previous organization structures." },
      { q: "How are correction and revision loops managed?", a: "We use Frame.io where you can leave direct, timecode-accurate markup points. Each rate package includes a structured number of revisions to ensure we reach delivery parameters efficiently." },
      { q: "Do you supply raw sound design and sound effects assets?", a: "Yes. Every assembly pass includes deep multitrack sound layers—ranging from background noise and ambient soundscapes to mechanical impact triggers." },
    ];
    for (const item of faq) {
      await ctx.db.insert("faq", item);
    }

    await ctx.db.insert("mainVid", { id: "r3rzDNVpuUE", title: "اكلات الانمي | هجوم العمالقة مع عمر عبدالرحمن !!", category: "entertainment", duration: "14:00", aspect: "Standard / 16:9", meta: "YouTube // 1080p", desc: "Anime food tasting experience with Omar Abdulrahman - trying dishes from Attack on Titan.", preview: "https://img.youtube.com/vi/r3rzDNVpuUE/maxresdefault.jpg", videoUrl: "https://youtu.be/r3rzDNVpuUE?si=tCT1uQAi1xj5P0y2" });

    const connectList = [
      { platform: "Instagram", handle: "@web.mikeey", url: "https://www.instagram.com/web.mikeey" },
      { platform: "X (Twitter)", handle: "@web_mikey", url: "https://x.com/web_mikey" },
    ];
    for (const item of connectList) {
      await ctx.db.insert("connect", item);
    }

    const hash = await hashPassword("mikeydownFullPanel123@");
    await ctx.db.insert("admins", { username: "mikeydown", passwordHash: hash });

    return { seeded: true };
  },
});
