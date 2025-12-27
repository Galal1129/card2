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

      await new Promise(resolve => setTimeout(resolve, 2000));

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
          const clonedElement = clonedDoc.querySelector('.receipt-container');
          if (clonedElement) {
            const allElements = clonedElement.querySelectorAll('*');
            allElements.forEach((el: Element) => {
              const htmlEl = el as HTMLElement;
              const computedStyle = window.getComputedStyle(el);

              htmlEl.style.fontFamily = "'Cairo', sans-serif";
              htmlEl.style.textDecoration = 'none';
              htmlEl.style.webkitFontSmoothing = 'antialiased';
              htmlEl.style.fontSmooth = 'always';
              htmlEl.style.textRendering = 'optimizeLegibility';
              htmlEl.style.letterSpacing = '0';
              htmlEl.style.fontFeatureSettings = '"liga" 1, "calt" 1';
              htmlEl.style.verticalAlign = 'middle';

              if (computedStyle.fontWeight) {
                htmlEl.style.fontWeight = computedStyle.fontWeight;
              }
              if (computedStyle.fontSize) {
                htmlEl.style.fontSize = computedStyle.fontSize;
              }
              if (computedStyle.lineHeight) {
                htmlEl.style.lineHeight = computedStyle.lineHeight;
              }
            });

            const arabicTextElements = clonedElement.querySelectorAll(
              '.company-name-ar-line, .contact-box-title, .action-title, .pill-label, .account-label, .card-label, .box-label, .customer-name-box, .notice-box, .card-value, .amount-words-box, .detail-label, .detail-value, .notice-bar'
            );
            arabicTextElements.forEach((el: Element) => {
              const htmlEl = el as HTMLElement;
              htmlEl.style.fontFamily = "'Cairo', sans-serif";
              htmlEl.style.direction = 'rtl';
              htmlEl.style.unicodeBidi = 'bidi-override';
              htmlEl.style.textAlign = 'center';
              htmlEl.style.letterSpacing = '0';
              htmlEl.style.whiteSpace = 'normal';
              htmlEl.style.fontKerning = 'normal';
              htmlEl.style.fontFeatureSettings = '"liga" 1, "calt" 1, "curs" 1';
              htmlEl.style.verticalAlign = 'middle';
            });

            const headerArabicElements = clonedElement.querySelectorAll('.company-name-ar-line, .contact-box-title');
            headerArabicElements.forEach((el: Element) => {
              const htmlEl = el as HTMLElement;
              htmlEl.style.whiteSpace = 'nowrap';
              htmlEl.style.display = 'block';
              htmlEl.style.width = '100%';
            });
const actionTitle = clonedElement.querySelector('.action-title') as HTMLElement | null;
if (actionTitle) actionTitle.style.transform = 'translateY(-1px)';

            const labels = clonedElement.querySelectorAll('.pill-label, .account-label, .card-label, .box-label');
            labels.forEach((label: Element) => {
              const htmlLabel = label as HTMLElement;
              htmlLabel.style.textDecoration = 'none';
              htmlLabel.style.borderBottom = 'none';
            });

            const containerElements = clonedElement.querySelectorAll(
              '.info-card, .date-pill, .document-pill, .account-number-box, .account-label-box, .customer-name-box, .customer-label-box, .statement-box, .code-box'
            );
            containerElements.forEach((container: Element) => {
              const htmlContainer = container as HTMLElement;
              htmlContainer.style.display = 'flex';
              htmlContainer.style.alignItems = 'center';
              htmlContainer.style.justifyContent = 'center';
            });

            const flexColumnElements = clonedElement.querySelectorAll('.info-card');
            flexColumnElements.forEach((card: Element) => {
              const htmlCard = card as HTMLElement;
              htmlCard.style.flexDirection = 'column';
            });

            const textElements = clonedElement.querySelectorAll(
              '.pill-label, .pill-value, .card-label, .card-value, .account-label, .account-value, .box-label, .customer-label-box, .customer-name-box'
            );
            textElements.forEach((el: Element) => {
              const htmlEl = el as HTMLElement;
              htmlEl.style.paddingTop = '0';
              htmlEl.style.lineHeight = '1.2';
              htmlEl.style.display = 'inline-block';         
              htmlEl.style.transform = 'translateY(-1px)';    
            });
          }
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
      <button
        onClick={handleExportAsImage}
        className="export-button"
        title="تصدير كصورة"
      >
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
              <div className="customer-label-box">
                عميلنا
              </div>
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
                <div className="card-value">400 <span className="card-currency">ريال يمني</span></div>
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
