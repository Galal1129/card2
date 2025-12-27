import React, { useRef } from 'react';
import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import './MoneyTransferReceipt.css';

const MoneyTransferReceipt: React.FC = () => {
  const receiptRef = useRef<HTMLDivElement>(null);

  const handleExportAsImage = async () => {
    if (!receiptRef.current) return;

    try {
      await document.fonts.ready;
      await document.fonts.load('700 20px Cairo');
      await document.fonts.load('800 20px Cairo');
      await document.fonts.load('600 14px Cairo');

      await new Promise((resolve) => setTimeout(resolve, 2000));

      const canvas = await html2canvas(receiptRef.current, {
        scale: 3,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: true,
        width: 900,
        height: 634,
        windowWidth: 900,
        windowHeight: 634,
        foreignObjectRendering: false,
        letterRendering: false,

        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.querySelector('.receipt-container') as HTMLElement | null;
          if (!clonedElement) return;

          const view = clonedDoc.defaultView || window;

          // 1) Normalize all elements styles for canvas rendering
          const allElements = clonedElement.querySelectorAll('*');
          allElements.forEach((el) => {
            const htmlEl = el as HTMLElement;
            const computedStyle = view.getComputedStyle(el);

            htmlEl.style.fontFamily = "'Cairo', sans-serif";
            htmlEl.style.textDecoration = 'none';
            htmlEl.style.webkitFontSmoothing = 'antialiased';
            htmlEl.style.textRendering = 'optimizeLegibility';
            htmlEl.style.letterSpacing = '0';
            htmlEl.style.fontFeatureSettings = '"liga" 1, "calt" 1';
            htmlEl.style.verticalAlign = 'middle';

            if (computedStyle.fontWeight) htmlEl.style.fontWeight = computedStyle.fontWeight;
            if (computedStyle.fontSize) htmlEl.style.fontSize = computedStyle.fontSize;
            if (computedStyle.lineHeight) htmlEl.style.lineHeight = computedStyle.lineHeight;
          });

          // 2) Arabic shaping + bidi
          const arabicTextElements = clonedElement.querySelectorAll(
            '.company-name-ar-line, .contact-box-title, .action-title, .pill-label, .account-label, .card-label, .box-label, .customer-name-box, .notice-box, .card-value, .amount-words-box, .detail-label, .detail-value, .notice-bar'
          );
          arabicTextElements.forEach((el) => {
            const htmlEl = el as HTMLElement;
            htmlEl.style.fontFamily = "'Cairo', sans-serif";
            htmlEl.style.direction = 'rtl';
            htmlEl.style.unicodeBidi = 'plaintext';
            htmlEl.style.textAlign = 'center';
            htmlEl.style.letterSpacing = '0';
            htmlEl.style.whiteSpace = 'normal';
            htmlEl.style.fontKerning = 'normal';
            htmlEl.style.fontFeatureSettings = '"liga" 1, "calt" 1, "curs" 1';
            htmlEl.style.verticalAlign = 'middle';
          });

          // Header Arabic lines stay in one line
          const headerArabicElements = clonedElement.querySelectorAll('.company-name-ar-line, .contact-box-title');
          headerArabicElements.forEach((el) => {
            const htmlEl = el as HTMLElement;
            htmlEl.style.whiteSpace = 'nowrap';
            htmlEl.style.display = 'block';
            htmlEl.style.width = '100%';
          });

          // Remove any underline/borders from labels
          const labels = clonedElement.querySelectorAll('.pill-label, .account-label, .card-label, .box-label');
          labels.forEach((label) => {
            const htmlLabel = label as HTMLElement;
            htmlLabel.style.textDecoration = 'none';
            htmlLabel.style.borderBottom = 'none';
          });

          // 3) Make the important containers flex-centered (stable in html2canvas)
          const containerElements = clonedElement.querySelectorAll(
            '.date-pill, .document-pill, .account-number-box, .account-label-box, .customer-name-box, .customer-label-box, .info-card, .statement-box, .code-box'
          );
          containerElements.forEach((el) => {
            const box = el as HTMLElement;
            box.style.display = 'flex';
            box.style.alignItems = 'center';
            box.style.justifyContent = 'center';
          });

          // Ensure info-card keeps column layout
          const infoCards = clonedElement.querySelectorAll('.info-card');
          infoCards.forEach((card) => {
            const htmlCard = card as HTMLElement;
            htmlCard.style.flexDirection = 'column';
          });

          // 4) The REAL fix: force fixed height + no vertical padding for the 3 problem elements
          const forceCenter = (selector: string, height: string, padding: string) => {
            const el = clonedElement.querySelector(selector) as HTMLElement | null;
            if (!el) return;

            el.style.display = 'flex';
            el.style.alignItems = 'center';
            el.style.justifyContent = 'center';
            el.style.height = height;
            el.style.padding = padding;
            el.style.lineHeight = '1';
          };

          // These were the ones that usually render "low" in the exported image
          forceCenter('.action-title', '52px', '0 50px');
          forceCenter('.notice-bar', '34px', '0 16px');
          forceCenter('.timestamp-pill', '34px', '0 14px');

          // 5) Prevent baseline drift for small texts inside pills/cards
          clonedElement.querySelectorAll(
            '.pill-label, .pill-value, .account-label, .account-value, .card-label, .card-value, .box-label'
          ).forEach((node) => {
            const t = node as HTMLElement;
            t.style.display = 'block';
            t.style.lineHeight = '1.2';
            t.style.margin = '0';
            t.style.padding = '0';
          });

          // Keep these centered nicely too
          const textElements = clonedElement.querySelectorAll(
            '.customer-label-box, .customer-name-box'
          );
          textElements.forEach((el) => {
            const htmlEl = el as HTMLElement;
            htmlEl.style.lineHeight = '1.2';
          });
        },
      });

      const image = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.href = image;
      link.download = 'receipt-31021.png';
      link.click();
    } catch (error) {
      console.error('Error exporting receipt:', error);
      alert('حدث خطأ أثناء تصدير الإشعار. يرجى المحاولة مرة أخرى.');
    }
  };

  return (
    <div className="receipt-page">
      <button onClick={handleExportAsImage} className="export-button" title="تصدير كصورة">
        <Download size={20} />
        <span>تصدير كصورة</span>
      </button>

      <div className="receipt-container" ref={receiptRef}>
        <div className="receipt-inner-frame">
          <div className="receipt-header">
            <div className="header-right">
              <div className="contact-box">
                <div className="contact-box-title">Yemen - Sana'a</div>
                <div className="contact-box-phone">+967 781 444 721</div>
                <div className="contact-box-phone">+967 730 994 931</div>
              </div>
            </div>

            <div className="header-center">
              <div className="company-name-ar-line">الترف</div>
              <div className="company-name-ar-line"> للتحويلات المالية </div>
              <div className="company-name-ar-line"></div>
              <div className="company-name-en">Al-Taraf</div>
            </div>

            <div className="header-left">
              <div className="contact-box">
                <div className="contact-box-title">اليمن - صنعاء</div>
                <div className="contact-box-phone">+967 781 444 721</div>
                <div className="contact-box-phone">+967 730 994 931</div>
              </div>
            </div>
          </div>

          <div className="receipt-content">
            <div className="title-row">
              <div className="date-pill">
                <span className="pill-label">التاريخ:</span>
                <span className="pill-value">2025-09-12</span>
              </div>

              <div className="action-title">إرسال حوالة</div>

              <div className="document-pill">
                <span className="pill-label">رقم المستند:</span>
                <span className="pill-value">31021</span>
              </div>
            </div>

            <div className="customer-row">
              <div className="customer-label-box">عميلنا</div>

              <div className="customer-name-box">
                هشام فؤاد سعيد قاسم الراسمي
              </div>

              <div className="account-label-box">
                <span className="account-label">رقم الحسابي:</span>
              </div>

              <div className="account-number-box">
                <span className="account-value">1231132</span>
              </div>
            </div>

            <div className="notice-row">
              <div className="notice-box">
                نود إشعاركم أننا خصمنا من حسابكم لدينا حسب توجيهكم لنا بإرسال حوالة مالية حسب التفاصيل التالية
              </div>
            </div>

            <div className="four-cards-row">
              <div className="info-card">
                <div className="card-label">مبلغ الحساب</div>
                <div className="card-value">400</div>
              </div>

              <div className="info-card">
                <div className="card-label">عملة الحساب</div>
                <div className="card-value">دولار أزرق</div>
              </div>

              <div className="info-card">
                <div className="card-label">العمولة</div>
                <div className="card-value">
                  400 <span className="card-currency">ريال يمني</span>
                </div>
              </div>

              <div className="info-card">
                <div className="card-label">الإجمالي</div>
                <div className="card-value">400</div>
              </div>
            </div>

            <div className="amount-words-row">
              <div className="amount-words-box">
                أربعمائة دولار أزرق لا غير
              </div>
            </div>

            <div className="statement-code-row">
              <div className="statement-box">
                <span className="box-label">البيان</span>
              </div>
              <div className="code-box">
                <span className="box-label">الكود</span>
              </div>
            </div>

            <div className="bottom-section">
              <div className="transfer-details">
                <div className="detail-row">
                  <span className="detail-label">رقم الحوالة:</span>
                  <span className="detail-value">1126752892</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">المرسل:</span>
                  <span className="detail-value">هشام فؤاد سعيد قاسم الراسمي</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">المستلم:</span>
                  <span className="detail-value">صالح أحمد عبده أحمد عمر</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">الجهة:</span>
                  <span className="detail-value">شبكة الامتياز</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">هشام فؤاد سعيد قاسم الراسمي/الرقم العام:</span>
                  <span className="detail-value">1126752892</span>
                </div>
              </div>

              <div className="qr-container">
                <div className="qr-placeholder">QR</div>
              </div>
            </div>

            <div className="final-notice-row">
              <div className="timestamp-pill">12/09/2025 م 08:24:16</div>
              <div className="notice-bar">هذا الإشعار لا يلزم ختم أو توقيع</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoneyTransferReceipt;
