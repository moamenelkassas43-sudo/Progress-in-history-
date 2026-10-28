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

    const themeToggle = document.getElementById('themeToggle');
    const logoutBtn = document.getElementById('logoutBtn');
    const bellBtn = document.getElementById('bellBtn');
    const notificationsDropdown = document.getElementById('notificationsDropdown');

    // تحقق مما إذا كان الطالب مسجلاً مسبقاً
    const savedUser = localStorage.getItem('history_student_data');
    if (savedUser) {
        const userData = JSON.parse(savedUser);
        applyUserData(userData);
        authModal.classList.add('hidden');
        mainApp.classList.remove('hidden');
        mainApp.classList.add('opacity-100');
    }

    // معالجة نموذج تسجيل الدخول
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const userData = {
            name: studentNameInput.value.trim(),
            grade: studentGradeInput.value,
            gender: studentGenderInput.value,
            phone: studentPhoneInput.value.trim()
        };

        // حفظ البيانات
        localStorage.setItem('history_student_data', JSON.stringify(userData));

        // تطبيق البيانات والثيم
        applyUserData(userData);

        // اهتزاز خفيف للأزرار للتفاعل (Haptic / Micro-feedback)
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }

        // إخفاء نافذة التسجيل وإظهار المنصة بانسيابية
        authModal.classList.add('opacity-0');
        setTimeout(() => {
            authModal.classList.add('hidden');
            mainApp.classList.remove('hidden');
            setTimeout(() => {
                mainApp.classList.add('opacity-100');
            }, 50);
        }, 300);
    });

    function applyUserData(data) {
        displayName.textContent = data.name;
        displayGrade.textContent = data.grade;
        displayPhone.textContent = data.phone;

        // تطبيق لون الثيم حسب الجنس (ولد -> أزرق، بنت -> وردي)
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

    // تبديل الوضع الليلي والنهاري (Dark / Light Mode)
    themeToggle.addEventListener('click', () => {
        const html = document.documentElement;
        if (html.classList.contains('dark')) {
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    // التحقق من الثيم المحفوظ مسبقاً للوضع الليلي
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.classList.remove('dark');
    }

    // قائمة الجرس والتنبيهات
    bellBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notificationsDropdown.classList.toggle('hidden');
    });

    // إغلاق قائمة التنبيهات عند النقر في أي مكان خارجي
    window.addEventListener('click', () => {
        if (!notificationsDropdown.classList.contains('hidden')) {
            notificationsDropdown.classList.add('hidden');
        }
    });
});
