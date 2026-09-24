# Product Starter

Website học Product cho người mới bắt đầu. Chạy miễn phí trên **GitHub Pages**; bạn chỉ cần viết bài.

---

## 1. Đưa website lên (làm một lần, ~15 phút)

1. Tạo tài khoản miễn phí ở **github.com**.
2. Bấm **+ → New repository**.
   - **Repository name:** `TEN-GITHUB-CUA-BAN.github.io` (ví dụ tên GitHub là `ducle` thì gõ `ducle.github.io`).
   - Chọn **Public**, bấm **Create repository**.
3. Trong repo mới, bấm **uploading an existing file**.
   Giải nén file zip, mở thư mục `product-starter`, **chọn tất cả file và thư mục bên trong** rồi kéo thả vào trang GitHub. Bấm **Commit changes**.
4. Vào **Settings → Pages**: ở *Build and deployment* chọn **Deploy from a branch**, branch **main**, thư mục **/ (root)**, bấm **Save**.
5. Đợi 1–3 phút, mở `https://TEN-GITHUB-CUA-BAN.github.io`. Xong!

> Xem tiến trình ở tab **Actions**: dấu ✓ xanh là đã lên web, dấu ✗ đỏ là có lỗi (bấm vào để xem dòng nào sai).

---

## 2. Viết bài mới (việc bạn làm hằng ngày)

Mỗi bài học là **1 file** trong thư mục `_days`. Ví dụ tạo Day 2:

1. Mở thư mục `_days`, bấm vào file `day-2.md`, bấm biểu tượng **bút chì ✏️** để sửa.
2. Phần trên cùng (giữa hai dòng `---`) là thông tin bài. **Giữ nguyên dấu `---`.**
3. Viết nội dung bài **bên dưới** dòng `---` thứ hai.
4. Bấm **Commit changes**. Khoảng 1 phút sau bài lên web.

Bài chưa có nội dung sẽ tự hiện "This lesson is being written". Viết vào là tự hiện bài.

**Thêm bài mới hoàn toàn** (ví dụ Day 6): trong `_days` bấm **Add file → Create new file**, đặt tên `day-6.md`, dán mẫu:

```
---
day: 6
title: "Tên bài học"
topic: Basics
minutes: 5
summary: "Một câu tóm tắt bài."
---

Nội dung bài viết ở đây.
```

`topic` phải là một trong: `Basics`, `Discovery`, `Delivery`, `Metrics`, `Career`.

### Cách định dạng khi viết (Markdown)

| Muốn có | Gõ |
|---|---|
| Tiêu đề mục | `## Tiêu đề` |
| Chữ đậm | `**chữ đậm**` |
| Tô bút dạ quang | `<mark>ý quan trọng</mark>` (1–2 chỗ mỗi bài thôi) |
| Danh sách | `- ý 1` hoặc `1. bước 1` |
| Link | `[chữ hiển thị](https://...)` |
| Hộp "Key takeaway" | dòng bắt đầu bằng `>` (xem mẫu dưới) |
| Hình ảnh | `![mô tả ảnh](/images/ten-anh.webp)` |

Hộp ý chính cuối bài:

```
> **Key takeaway**
>
> Product is a loop: understand, build a little, check, repeat.
```

Mẫu đầy đủ: xem `_days/day-1.md`.

---

## 3. Hình ảnh

1. Mở thư mục `images`, bấm **Add file → Upload files**, kéo ảnh vào, **Commit**.
2. Trong bài viết: `![Chiếc xe đồ chơi](/images/ten-anh.webp)`.

Mẹo: đặt tên ảnh không dấu, không khoảng trắng (`day-2-bakery.webp`); nén ảnh dưới ~300 KB (dùng squoosh.app, miễn phí).

---

## 4. Case study, Stories, Templates

Giống hệt bài học, chỉ khác thư mục:

| Nội dung | Thư mục | Ghi chú |
|---|---|---|
| Case study | `_cases` | `status: coming-soon` = chưa viết xong; đổi thành `published` khi xong |
| Stories | `_stories` | `sample: true` hiện nhãn "Sample"; bỏ đi khi là câu chuyện thật |
| Templates | `_templates` | nội dung template viết trong `text: |` (mỗi dòng thụt vào 2 dấu cách) |

---

## 5. Game

Mỗi game là **một thư mục** trong `play/`, bên trong có `index.html`.
Game mẫu: `play/pm-quiz/` → `ten-ban.github.io/play/pm-quiz/`.
Muốn sửa câu hỏi: mở `play/pm-quiz/index.html`, tìm danh sách `var Q = [` và sửa câu chữ.

---

## 6. Gắn domain riêng (khi đã mua)

1. **Settings → Pages → Custom domain**: nhập domain (vd `productstarter.com`), **Save**.
2. Ở nơi mua domain, mục DNS, thêm:
   - 4 bản ghi **A** cho `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - 1 bản ghi **CNAME** cho `www` → `TEN-GITHUB-CUA-BAN.github.io`
3. Vài giờ sau, quay lại **Settings → Pages**, tick **Enforce HTTPS**.

---

## 7. Newsletter

Khi đã có Substack hoặc MailerLite: mở `_config.yml`, dán link đăng ký vào dòng
`newsletter_url: ""` → ví dụ `newsletter_url: "https://productstarter.substack.com/subscribe"`. Commit. Nút Subscribe trên web sẽ dẫn tới đó.

---

## 8. (Tuỳ chọn) Trang viết bài giống WordPress

Nếu không thích sửa file, có sẵn trang soạn thảo tại `ten-ban.github.io/admin/`:

1. Mở `admin/config.yml`, thay `YOUR-USERNAME` bằng tên GitHub của bạn (2 chỗ). Commit.
2. Vào `ten-ban.github.io/admin/`, bấm **Sign In with Token**, làm theo đường link GitHub hiện ra để tạo token (quyền *Contents: Read and write*), dán token vào.
3. Từ đó viết bài, upload ảnh ngay trên trang này.

---

## Nếu có gì hỏng

- Tab **Actions** có dấu ✗ đỏ → thường do phần giữa hai dòng `---` bị sai (thiếu dấu `"`, thụt dòng lệch). Mở commit gần nhất, sửa lại.
- Muốn quay về bản cũ: mở file → **History** → chọn bản trước → copy lại nội dung.
