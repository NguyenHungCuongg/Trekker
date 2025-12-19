import crypto from "crypto";

/**
 * Tạo object đã chuẩn hoá: sort key ASC, loại key rỗng/undefined/null.
 */
export function normalizeParams(params: Record<string, any>) {
  const clean: Record<string, string> = {};
  Object.keys(params)
    .filter(
      (k) => params[k] !== undefined && params[k] !== null && params[k] !== "",
    )
    .sort()
    .forEach((k) => {
      clean[k] = String(params[k]);
    });
  return clean;
}

/**
 * Tạo chuỗi query đã encode và sort (dùng cho ký và để gắn vào URL).
 * Nếu excludeKeys được truyền, các key đó sẽ bị loại khi build chuỗi.
 */
export function buildQueryString(
  params: Record<string, any>,
  excludeKeys: string[] = [],
): string {
  const normalized = normalizeParams(params);
  const parts: string[] = [];
  for (const k of Object.keys(normalized)) {
    if (excludeKeys.includes(k)) continue;
    const ek = encodeURIComponent(k);
    const ev = encodeURIComponent(normalized[k]).replace(/%20/g, "+");
    parts.push(`${ek}=${ev}`);
  }
  return parts.join("&");
}

/**
 * Tạo chữ ký HMAC-SHA512 theo đúng format VNPay.
 */
export function createVnPayHash(
  params: Record<string, any>,
  secret: string,
): string {
  const data = buildQueryString(params, [
    "vnp_SecureHash",
    "vnp_SecureHashType",
  ]);
  return crypto.createHmac("sha512", secret).update(data, "utf8").digest("hex");
}

/**
 * build full query string including vnp_SecureHash (cho URL cuối cùng)
 */
export function buildSignedQuery(
  params: Record<string, any>,
  secret: string,
): string {
  const secureHash = createVnPayHash(params, secret);
  const withHash = { ...params, vnp_SecureHash: secureHash };
  return buildQueryString(withHash);
}
