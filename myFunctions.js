// التحقق من صحة المدخلات في نموذج الطلب
const form = document.getElementById('orderForm');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // منع الإرسال الافتراضي

    // جمع القيم من الحقول
    const fullName = document.getElementById('fullName').value.trim();
    const nationalId = document.getElementById('nationalId').value.trim();
    const dob = document.getElementById('dob').value;
    const mobile = document.getElementById('mobile').value.trim();
    const email = document.getElementById('email').value.trim();

    // التحقق من صحة المدخلات
    let valid = true;
    let errors = [];

    // التحقق من الاسم الكامل
    if (!/^[\u0621-\u064A\s]+$/.test(fullName)) {
        valid = false;
        errors.push('الاسم الكامل يجب أن يحتوي على أحرف عربية فقط.');
    }

    // التحقق من الرقم الوطني
    if (!/^[0-9]{11}$/.test(nationalId)) {
        valid = false;
        errors.push('الرقم الوطني يجب أن يكون 11 رقمًا.');
    }

    
    // التحقق من رقم الموبايل
    if (!/^(093|094|095|098|096|099)[0-9]{7}$/.test(mobile)) {
    valid = false;
    errors.push('رقم الموبايل يجب أن يبدأ بـ 093 أو 094 أو 095 أو 098 أو 096 أو 099 ويتكون من 10 أرقام.');
}

    

    // التحقق من الإيميل
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        valid = false;
        errors.push('الإيميل غير صالح.');
    }

    // عرض الأخطاء إذا كانت موجودة
    if (!valid) {
        alert(errors.join('\n'));
        return;
    }

    // إذا كان التحقق ناجحًا، تخزين البيانات في sessionStorage
    const orderData = {
        fullName,
        nationalId,
        dob,
        mobile,
        email
    };

    sessionStorage.setItem('orderData', JSON.stringify(orderData));

    // الانتقال إلى صفحة التأكيد
    window.location.href = './confirmation.html';
});

// عرض البيانات في صفحة التأكيد
if (window.location.pathname.includes('confirmation.html')) {
    const orderData = JSON.parse(sessionStorage.getItem('orderData'));

    if (orderData) {
        const summarySection = document.getElementById('orderSummary');
        summarySection.innerHTML = `
            <h2>ملخص الطلب</h2>
            <p><strong>الاسم الكامل:</strong> ${orderData.fullName}</p>
            <p><strong>الرقم الوطني:</strong> ${orderData.nationalId}</p>
            <p><strong>تاريخ الميلاد:</strong> ${orderData.dob}</p>
            <p><strong>رقم الموبايل:</strong> ${orderData.mobile}</p>
            <p><strong>الإيميل:</strong> ${orderData.email}</p>
            <p class="thank-you-message">شكرًا لاختياركم مكتبتنا، نتمنى لكم تجربة قراءة ممتعة!</p>
        `;
    } else {
        alert('لا توجد بيانات لعرضها.');
        window.location.href = './Form.html';
    }
}


    
