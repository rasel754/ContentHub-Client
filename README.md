# 🚀 ContentHub - AI-Powered Content Management Studio

[![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Clerk](https://img.shields.io/badge/Clerk-Authentication-6C47FF?style=flat-square&logo=clerk)](https://clerk.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=flat-square&logo=vercel)](https://vercel.com/)

ContentHub is a state-of-the-art SaaS web application designed for generating, editing, and managing SEO-optimized copy using advanced AI language model integration. It provides a robust, user-centric dashboard alongside role-based tools for admins, managers, and standard content creators.

---

## 📖 1. Project Overview (সংক্ষেপে)

**ContentHub** হলো একটি সম্পূর্ণ আধুনিক এবং রেসপনসিভ এআই-চালিত কনটেন্ট জেনারেশন ও ম্যানেজমেন্ট হাব। এখানে আর্টিফিসিয়াল ইন্টেলিজেন্স ব্যবহার করে ইনস্ট্যান্টলি ব্লগ পোস্ট, ইমেইল নিউজলেটার, স্ক্রিপ্ট বা সোশ্যাল মিডিয়া পোস্ট তৈরি করা যায়। 

* **What users can do:**
  * **AI Generation:** টেমপ্লেট ও কি-ওয়ার্ড সিলেক্ট করে কয়েক সেকেন্ডে এআই-এর মাধ্যমে কনটেন্ট রাইটিং।
  * **Dynamic Dashboard:** নিজের তৈরি কনটেন্ট ট্র্যাক করার জন্য ইন্টারঅ্যাক্টিভ ও ভিজ্যুয়াল গ্রাফ।
  * **Role-Based Workspace:** ইউজার রোল অনুযায়ী অ্যাডমিন প্যানেল, মডারেশন টুলস এবং পার্সোনাল স্টুডিও অ্যাক্সেস।
* **Architecture Note:**
  * এটি একটি **Full-stack** অ্যাপ্লিকেশনের **Frontend Client**। যা এক্সপ্রেস-ভিত্তিক সিকিউরড ব্যাকএন্ড রুটগুলোর সাথে কমিউনিকেট করে কাজ করে।

---

## 🖼️ 2. Screenshot

![App Screenshot](./screenshot.png)

---

## 🛠️ 3. Technologies Used (ব্যবহৃত প্রযুক্তিসমূহ)

আমরা এই প্রজেক্টের পারফরম্যান্স ও স্কেলেবিলিটির জন্য ইন্ডাস্ট্রির বেস্ট টুলস ও ফ্রেমওয়ার্কগুলো ব্যবহার করেছি:

* **Next.js 16 (App Router)** - সার্ভার ও ক্লায়েন্ট সাইড রেন্ডারিং এবং অপ্টিমাইজড রাউটিং-এর জন্য।
* **React 19** - মডার্ন স্টেট হ্যান্ডলিং এবং রিয়্যাক্টিভ ইউজার ইন্টারফেস ডিজাইনের জন্য।
* **TypeScript** - স্ট্যাটিক টাইপ চেকিং এবং কোডবেস বাগ-ফ্রি রাখার জন্য।
* **Tailwind CSS v4** - আল্ট্রা-ফাস্ট ডিজাইন ও গ্ল্যাসমরফিক/ডার্ক থিম স্টাইলিংয়ের জন্য।
* **Clerk (Authentication & RBAC)** - পাসওয়ার্ডলেস সিকিউর লগইন এবং রোল কন্ট্রোল করার জন্য।
* **Axios & TanStack React Query** - ডেটা ফেচিং, ক্যাশিং এবং ব্যাকএন্ড এপিআই সিনক্রোনাইজেশনের জন্য।

---

## ✨ 4. Features (মূল ফিচারসমূহ)

* 🔐 **Robust Authentication:** Clerk-এর মাধ্যমে সিকিউর সোশ্যাল (Google, GitHub) ও ইমেইল অথেন্টিকেশন।
* 📊 **Personalized Dashboard:** Recharts দিয়ে ইন্টারেক্টিভ কন্টেন্ট পারফরম্যান্স ভিজ্যুয়ালাইজেশন।
* 🤖 **AI Content Studio:** ব্লগের জন্য আউটলাইন, ট্রিমড কিওয়ার্ড এনালাইসিস ও এআই কো-পাইলট চ্যাট অ্যাসিস্ট্যান্ট।
* 🗂️ **Content Management:** কন্টেন্ট ক্রিয়েশন, আপগ্রেডেশন, ডিলিট ও ড্রাফটিং সিস্টেম।
* ⚡ **Debounced Search & Filtering:** যেকোনো কন্টেন্ট ইনস্ট্যান্টলি সার্চ ও ক্যাটাগরি ওয়াইজ ফিল্টার করার সুবিধা।
* 🛡️ **Role-Based Access Control (RBAC):** 
  * **Admin:** ইউজার ম্যানেজমেন্ট এবং প্ল্যাটফর্ম স্ট্যাটিস্টিকস।
  * **Manager:** কন্টেন্ট মডারেশন ও অ্যাপ্রুভাল ড্যাশবোর্ড।
  * **User:** পার্সোনাল কন্টেন্ট জেনারেশন ও এআই চ্যাট এক্সেস।
* 🎨 **Dark & Light Mode UI:** চোখের সুরক্ষার জন্য অটো ও ম্যানুয়াল থিম সুইচিং।
* 📱 **Responsive Design:** মোবাইল, ট্যাবলেট এবং ডেস্কটপ স্ক্রিনের জন্য ১০০% অপ্টিমাইজড লেআউট।

---

## 📦 5. Key Dependencies (প্যাকেজসমূহ)

প্রজেক্টের `package.json` থেকে প্রধান ডিপেন্ডেন্সিগুলো নিচে দেওয়া হলো:

```json
{
  "dependencies": {
    "next": "16.2.6",
    "react": "^19.0.0",
    "clerk": "^7.5.9",
    "axios": "^1.18.1",
    "react-hook-form": "^7.80.0",
    "zod": "^4.4.3",
    "recharts": "^3.9.0",
    "@tanstack/react-query": "^5.101.1",
    "lucide-react": "^1.16.0"
  }
}
```

---

## ⚙️ 6. Run Locally (লোকাল সেটআপ গাইড)

প্রজেক্টটি আপনার লোকাল মেশিনে রান করতে নিচের কমান্ডগুলো রান করুন:

```bash
# ১. রিপোজিটরি ক্লোন করুন
git clone https://github.com/rasel754/ContentHub-Client.git

# ২. প্রজেক্ট ডিরেক্টরিতে যান
cd ContentHub-Client

# ৩. ডিপেন্ডেন্সি ইনস্টল করুন
npm install
# অথবা pnpm ব্যবহার করলে: pnpm install

# ৪. লোকাল সার্ভার চালু করুন
npm run dev
# অথবা: pnpm dev
```

### 🗝️ Environment Configuration
রুট ফোল্ডারে `.env.local` নামে একটি নতুন ফাইল তৈরি করুন এবং নিচের ভ্যারিয়েবলগুলো সেট করুন:

```env
# Clerk Credentials
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Backend Node API URL
NEXT_PUBLIC_API_URL=https://content-hub-server.vercel.app/api
```

---

## 🌐 7. Live Links & Repositories

* 🔗 **Live Client App:** [https://content-hub-client.vercel.app](https://content-hub-client.vercel.app)
* 🔗 **Live Backend API:** [https://content-hub-server.vercel.app](https://content-hub-server.vercel.app)
* 🔗 **Frontend GitHub Repo:** [https://github.com/rasel754/ContentHub-Client](https://github.com/rasel754/ContentHub-Client)
* 🔗 **Backend GitHub Repo:** [https://github.com/rasel754/ContentHub-Server](https://github.com/rasel754/ContentHub-Server)

---

Developed with ❤️ by [Rasel Ahmed](https://github.com/rasel754). For any queries, feel free to open a GitHub Issue!
