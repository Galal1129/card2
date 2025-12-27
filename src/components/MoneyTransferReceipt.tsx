import React, { useRef } from 'react';
import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import './MoneyTransferReceipt.css';

const MoneyTransferReceipt: React.FC = () => {
  const receiptRef = useRef<HTMLDivElement>(null);

  const handleExportAsImage = async () => {
    if (!receiptRef.current) return;

    const node = receiptRef.current;

    try {
      // 1) فعّل وضع التصدير (يمنع wrapping ويقلل gaps) قبل التصوير
      node.classList.add('exporting');

      // 2) انتظر تحميل الخطوط + انتظار رسمين (layout) لضمان القياسات
      await document.fonts.ready;
      await document.fonts.load('700 20px Cairo');
      await document.fonts.load('800 20px Cairo');
      await document.fonts.load('600 14px Cairo');

      await new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));

      // 3) التصوير
      const canvas = await html2canvas(node, {
        scale: 3,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: true,
        width: node.offsetWidth,
        height: node.offsetHeight,
        windowWidth: node.offsetWidth,
        windowHeight: node.offsetHeight,
        foreignObjectRendering: false,
        letterRendering: false,
        onclone: (clonedDoc) => {
          const clonedContainer = clonedDoc.querySelector('.receipt-container') as HTMLElement | null;
          if (!clonedContainer) return;

          // فعّل Export Mode داخل النسخة المستنسخة أيضًا
          clonedContainer.classList.add('exporting');

          // تثبيت المقاس (يمنع أي اختلافات في الطباعة داخل clone)
          clonedContainer.style.width = '900px';
          clonedContainer.style.height = '634px';

          // منع أي التفاف في الهيدر داخل التصدير
          clonedDoc
            .querySelectorAll(
              '.contact-box-title, .contact-box-phone, .company-name-ar-line, .company-name-en, .pill-label, .pill-value'
            )
            .forEach((el) => {
              (el as HTMLElement).style.whiteSpace = 'nowrap';
            });

          // اتجاه العربية مضبوط (أفضل من bidi-override لأنه قد يكسر قياسات بعض العناصر)
          clonedContainer.style.direction = 'rtl';
          clonedContainer.style.unicodeBidi = 'plaintext';
        },
      });

      // 4) تنزيل الصورة
      const image = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.href = image;
      link.download = 'receipt-31021.png';
      link.click();
    } catch (error) {
      console.error('Error exporting receipt:', error);
      alert('حدث خطأ أثناء تصدير الإشعار. يرجى المحاولة مرة أخرى.');
    } finally {
      // مهم جدًا: أعد الوضع الطبيعي بعد التصدير
      node.classList.remove('exporting');
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
              <div className="company-name-ar-line">للتحويلات المالية</div>
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

              <div className="customer-name-box">هشام فؤاد سعيد قاسم الراسمي</div>

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

            <div className="statement-c
