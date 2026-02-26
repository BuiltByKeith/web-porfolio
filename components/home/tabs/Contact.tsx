"use client";

import Image from "next/image";
import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errMsg, setErrMsg] = useState("");

  const links = [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/allen-keith-aradillos-865866368/",
      icon: "/images/icons/linkedin.png",
    },
    {
      label: "GitHub",
      href: "https://github.com/BuiltByKeith",
      icon: "/images/icons/github.png",
    },
    {
      label: "Email",
      href: "mailto:builtbykeith.dev@gmail.com",
      icon: "/images/icons/gmail.png",
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setErrMsg("Please fill in all fields.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send message.");
      }

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err: unknown) {
      setErrMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  return (
    <section className="w-full max-w-5xl mx-auto px-6 sm:px-10 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Left — contact info */}
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-1">Get in Touch</h2>
          <p className="text-sm text-gray-600 font-light leading-relaxed">
            Have a project in mind or just want to say hi? My inbox is always
            open.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {links.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 border border-gray-200 rounded-xl px-5 py-4 hover:bg-gray-50 transition-colors group"
            >
              <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 group-hover:bg-gray-200 transition-colors">
                <Image src={icon} alt={label} width={16} height={16} />
              </span>
              <span className="text-sm font-medium text-gray-700">{label}</span>
              <span className="ml-auto text-gray-300 group-hover:text-gray-500 transition-colors">
                →
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Right — message form */}
      <div className="border border-gray-200 rounded-xl p-6 flex flex-col gap-4">
        {status === "success" ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center py-10">
            <span className="text-3xl">🍀</span>
            <p className="text-sm font-medium text-gray-700">
              Message sent! I'll get back to you soon.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="text-xs text-gray-400 underline underline-offset-2 hover:text-gray-600 mt-1"
            >
              Send another
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-sm font-semibold text-gray-700">
              Send a Message
            </h3>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                disabled={status === "loading"}
                className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 disabled:opacity-50"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                disabled={status === "loading"}
                className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 disabled:opacity-50"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What's on your mind?"
                rows={4}
                disabled={status === "loading"}
                className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 resize-none disabled:opacity-50"
              />
            </div>

            {/* Error message */}
            {status === "error" && (
              <p className="text-xs text-red-500">{errMsg}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={status === "loading"}
              className="mt-1 w-full py-3 rounded-lg bg-linear-to-r from-blue-600 via-red-500 to-yellow-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === "loading" ? (
                <>
                  <svg
                    className="w-4 h-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default Contact;
