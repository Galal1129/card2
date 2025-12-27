import React, { useRef } from 'react';
import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import './MoneyTransferReceipt.css';

const MoneyTransferReceipt: React.FC = () => {
  const receiptRef = useRef<HTMLDivElement>(null);

  const handleExportAsImage = async () => {
    const node = receiptRef.current;
    if (!node) return;

    try {
      // انتظر تحميل الخطوط بالكامل (مهم جدًا مع Cairo)
      await document.fonts.ready;
      await Promise.all([
        document.fonts.load('400 14px Cairo'),
        document.fonts.load('600 14px Cairo'),
        document.fonts.load('700 16px Cairo'),
        document.fonts.load('800 20px Cairo'),
      ]);

      // تأخير بسيط جدًا لضمان استقرار الرسم قبل التصوير
      await new Promise((r) => setTimeout(r, 300));

      const canvas = await html2canvas(node, {
        scale: 3,
        backgroundColor: '#ffffff',
        useCORS: true,
        allowTaint: false,
        logging: false,

        // أهم خيار لحل مشكلة نزول النصوص + دعم العربية بشكل أفضل
        foreignObjectRendering: true,

        // يمنع مشاكل القص/الإزاحة لو الصفحة فيها سكرول
        scrollX: -window.scrollX,
        scrollY: -window.scrollY,

        onclone: (clonedDoc) => {
          // نظّف الصفحة المنسوخة حتى لا تؤثر محاذاة الصفحة الأصلية
          clonedDoc.documentElement.style.background = '#ffffff';
          clonedDoc.body.style.margin = '0';
          clonedDoc.body.style.padding = '0';

          // ثبت الخط داخل النسخة (احتياط)
          const style = clonedDoc.createElement('style');
          style.innerHTML = `
            * { font-family: 'Cairo', sans-serif !important; }
            body { background: #ffffff !important; }
          `;
          clonedDoc.head.appendChild(style);

          // اجعل عنصر الإيصال بدون أي إزاحة
          const clonedContainer = clonedDoc.querySelector('.receipt-container') as HTMLElement | null;
          if (clonedContainer) {
            clonedContainer.style.margin = '0';
            clonedContainer.style.transform = 'none';
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
              <div className="amount-words-box">أربعمائة دولار أزرق لا غير</div>
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
