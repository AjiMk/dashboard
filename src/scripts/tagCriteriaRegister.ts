import { TagCriteria, TagCriteriaModel } from "../models/tagCriteria";
import config from "../config/config";
import mongoose from "mongoose";

const allTagCriteria: any = {
  // Programming Languages
  JavaScript: ["node.js", "react", "angular", "javascript"],
  Python: ["python", "django", "flask"],
  PHP: ["php", "laravel", "wordpress"],
  Java: ["java", "spring", "hibernate"],
  "C#": ["c#", ".net", "asp.net"],
  "C++": ["c++", "cpp"],
  Ruby: ["ruby", "rails"],
  Go: ["go", "golang"],
  Swift: ["swift"],
  Kotlin: ["kotlin"],
  R: ["r"],
  TypeScript: ["typescript", "ts"],
  SQL: ["sql"],

  // Frameworks
  Spring: ["spring"],
  Hibernate: ["hibernate"],
  React: ["react"],
  Angular: ["angular"],
  Vue: ["vue"],
  Django: ["django"],
  Flask: ["flask"],
  Express: ["express"],
  Rails: ["rails"],
  "ASP.NET": ["asp.net", ".net"],
  Laravel: ["laravel"],
  WordPress: ["wordpress"],

  // Operating Systems
  Windows: ["windows"],
  Linux: ["linux", "ubuntu", "debian", "centos", "redhat"],
  macOS: ["macos", "osx"],
  Android: ["android"],
  iOS: ["ios"],

  // Vulnerability Types
  "SQL Injection": ["sql injection", "sql"],
  XSS: ["cross site scripting", "xss"],
  CSRF: ["cross site request forgery", "csrf"],
  RCE: ["remote code execution", "rce"],
  LFI: ["local file inclusion", "lfi"],
  RFI: ["remote file inclusion", "rfi"],
  XXE: ["xml external entity", "xxe"],
  "Privilege Escalation": ["privilege escalation"],
  "Directory Traversal": ["directory traversal"],
  "Buffer Overflow": ["buffer overflow"],
};

async function registerAll() {
  await mongoose.connect(config.dbURI, {});

  const allKeyWords = Object.keys(allTagCriteria);
  for (let i = 0; i < allKeyWords.length; i++) {
    const keyword = allKeyWords[i];
    const allTags = allTagCriteria[keyword];

    const insertData: TagCriteria = {
      tagName: keyword,
      tags: allTags,
    };

    await TagCriteriaModel.create(insertData);
  }

  console.log("registred");
}

registerAll();
