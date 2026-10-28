document.addEventListener('DOMContentLoaded', () => {
    const authModal = document.getElementById('authModal');
    const mainApp = document.getElementById('mainApp');
    const loginForm = document.getElementById('loginForm');
    
    const studentNameInput = document.getElementById('studentName');
    const studentGradeInput = document.getElementById('studentGrade');
    const studentGenderInput = document.getElementById('studentGender');
    const studentPhoneInput = document.getElementById('studentPhone');

    const displayName = document.getElementById('displayName');
    const displayGrade = document.getElementById('displayGrade');
    const displayPhone = document.getElementById('displayPhone');
    const displayUniqueCode = document.getElementById('displayUniqueCode');

    const bellBtn = document.getElementById('bellBtn');
    const notificationsDropdown = document.getElementById('notificationsDropdown');
    const logoutBtn = document.getElementById('logoutBtn');

    // توليد كود عشوائي فريد لكل طالب
    function generateUniqueCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = 'RQ-';
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }

    // التحقق مما إذا كان الطالب مسجلاً مسبقاً في الخادم المحلي (LocalStorage)
    const savedUser = localStorage.getItem('history_student_data');
    if (savedUser) {
        const userData = JSON.parse(savedUser);
        applyUserData(userData);
        authModal.classList.add('hidden');
        mainApp.classList.remove('hidden');
        mainApp.classList.add('opacity-100');
    }

    // معالجة نموذج التسجيل وحفظ بيانات الطالب والكود الفريد
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // التحقق من وجود كود سابق أو إنشاء كود عشوائي فريد جديد
        let uniqueCode = generateUniqueCode();

        const userData = {
            name: studentNameInput.value.trim(),
            grade: studentGradeInput.value,
            gender: studentGenderInput.value,
            phone: studentPhoneInput.value.trim(),
            code: uniqueCode
        };

        // تخزين البيانات في الخادم (LocalStorage) لكي لا يسجل مرة أخرى
        localStorage.setItem('history_student_data', JSON.stringify(userData));

        applyUserData(userData);

        if (navigator.vibrate) {
            navigator.vibrate(60);
        }

        authModal.classList.add('opacity-0');
        setTimeout(() => {
            authModal.classList.add('hidden');
            mainApp.classList.remove('hidden');
            setTimeout(() => {
                mainApp.classList.add('opacity-100');
            }, 50);
        }, 500);
    });

    function applyUserData(data) {
        displayName.textContent = data.name;
        displayGrade.textContent = data.grade;
        displayPhone.textContent = data.phone;
        displayUniqueCode.textContent = data.code || generateUniqueCode();

        // تطبيق الثيم التلقائي حسب الجنس
        if (data.gender === 'female') {
            document.body.classList.add('theme-female');
            document.body.classList.remove('theme-male');
        } else {
            document.body.classList.add('theme-male');
            document.body.classList.remove('theme-female');
        }
    }

    // زر تسجيل الخروج
    logoutBtn.addEventListener('click', () => {
        if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
            localStorage.removeItem('history_student_data');
            location.reload();
        }
    });

    // قائمة التنبيهات
    bellBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notificationsDropdown.classList.toggle('hidden');
    });

    window.addEventListener('click', () => {
        if (!notificationsDropdown.classList.contains('hidden')) {
            notificationsDropdown.classList.add('hidden');
        }
    });
});
