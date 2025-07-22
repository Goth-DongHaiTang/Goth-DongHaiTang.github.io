export function getBrowserName(userAgent) {
    const ua = userAgent.toLowerCase();

    // 调整判断顺序（从最独特到最通用）
    if (ua.includes("firefox/")) {
        return "Mozilla Firefox";
    } else if (ua.includes("samsungbrowser/")) {
        return "Samsung Internet";
    } else if (ua.includes("opr/") || ua.includes("opera/")) {
        return "Opera";
    } else if (ua.includes("edg/")) {
        return "Microsoft Edge (Chromium)";
    } else if (ua.includes("edge/")) {
        return "Microsoft Edge (Legacy)";
    } else if (ua.includes("chrome/") && !ua.includes("edg/")) {
        return "Google Chrome";
    } else if (ua.includes("safari/")) {
        return "Apple Safari";
    } else if (ua.includes("micromessenger")) {
        return "微信内置浏览器";
    } else if (ua.includes("qqbrowser")) {
        return "QQ浏览器";
    } else {
        return "未知浏览器";
    }
}