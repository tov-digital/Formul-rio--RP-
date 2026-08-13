document.addEventListener('DOMContentLoaded', () => {
    // Form Data State
    const formData = {
        age: '',
        gender: '',
        inssContribution: '',
        contributionYears: '',
        workType: '',
        specialActivity: '',
        income: '',
        previousAttempt: '',
        name: '',
        phone: ''
    };

    let currentStep = 0;
    const totalSteps = 9; // Steps 1 to 9 (Step 10 is success screen)

    // DOM Elements
    const backBtn = document.getElementById('backBtn');
    const progressWrapper = document.getElementById('progressWrapper');
    const progressBarFill = document.getElementById('progressBarFill');

    // Step Elements array
    const steps = [
        document.getElementById('step0'),
        document.getElementById('step1'),
        document.getElementById('step2'),
        document.getElementById('step3'),
        document.getElementById('step4'),
        document.getElementById('step5'),
        document.getElementById('step6'),
        document.getElementById('step7'),
        document.getElementById('step8'),
        document.getElementById('step9'),
        document.getElementById('step10')
    ];

    // Navigation function
    function goToStep(stepIndex) {
        if (stepIndex < 0 || stepIndex >= steps.length) return;

        // Hide current step
        steps[currentStep].classList.remove('active');
        
        currentStep = stepIndex;
        
        // Show new step
        steps[currentStep].classList.add('active');

        // Update header & progress bar
        if (currentStep === 0) {
            backBtn.style.display = 'none';
            progressWrapper.style.display = 'block';
            progressBarFill.style.width = '10%';
        } else if (currentStep === 10) {
            backBtn.style.display = 'none';
            progressWrapper.style.display = 'none';
        } else {
            backBtn.style.display = 'flex';
            progressWrapper.style.display = 'block';
            
            // Calculate progress percentage (Step 1 = 20%, ..., Step 9 = 100%)
            const percentage = 10 + (currentStep / totalSteps) * 90;
            progressBarFill.style.width = `${Math.min(percentage, 100)}%`;
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Step 0: Start Button
    document.getElementById('startBtn').addEventListener('click', () => {
        goToStep(1);
    });

    // Back Button Click Handler
    backBtn.addEventListener('click', () => {
        if (currentStep > 0 && currentStep <= totalSteps) {
            goToStep(currentStep - 1);
        }
    });

    // Step 1: Idade
    const inputAge = document.getElementById('inputAge');
    const btnStep1Next = document.getElementById('btnStep1Next');

    btnStep1Next.addEventListener('click', () => {
        const ageVal = inputAge.value.trim();
        if (!ageVal) {
            alert('Por favor, informe sua idade.');
            inputAge.focus();
            return;
        }
        formData.age = ageVal;
        goToStep(2);
    });

    inputAge.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            btnStep1Next.click();
        }
    });

    // Step 2: Gênero Cards
    document.querySelectorAll('.gender-card').forEach(card => {
        card.addEventListener('click', () => {
            formData.gender = card.dataset.gender;
            goToStep(3);
        });
    });

    // Step 3: INSS Options
    document.querySelectorAll('#step3 .option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            formData.inssContribution = btn.dataset.inss;
            goToStep(4);
        });
    });

    // Step 4: Quantos anos contribuiu
    const inputContributionYears = document.getElementById('inputContributionYears');
    const btnStep4Next = document.getElementById('btnStep4Next');

    btnStep4Next.addEventListener('click', () => {
        const yearsVal = inputContributionYears.value.trim();
        if (yearsVal === '') {
            alert('Por favor, informe os anos de contribuição (ou uma estimativa).');
            inputContributionYears.focus();
            return;
        }
        formData.contributionYears = yearsVal;
        goToStep(5);
    });

    inputContributionYears.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            btnStep4Next.click();
        }
    });

    // Step 5: Forma de Trabalho
    document.querySelectorAll('#step5 .option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            formData.workType = btn.dataset.work;
            goToStep(6);
        });
    });

    // Step 6: Atividade Especial
    document.querySelectorAll('#step6 .option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            formData.specialActivity = btn.dataset.special;
            goToStep(7);
        });
    });

    // Step 7: Quanto Ganha
    document.querySelectorAll('#step7 .option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            formData.income = btn.dataset.income;
            goToStep(8);
        });
    });

    // Step 8: Tentou Aposentar Antes
    document.querySelectorAll('#step8 .option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            formData.previousAttempt = btn.dataset.attempt;
            goToStep(9);
        });
    });

    // Step 9: Final Lead Form
    const btnSubmitLead = document.getElementById('btnSubmitLead');
    const inputName = document.getElementById('inputName');
    const inputPhone = document.getElementById('inputPhone');

    // Phone formatting mask helper
    inputPhone.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        
        if (value.length > 6) {
            value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
        } else if (value.length > 2) {
            value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        } else if (value.length > 0) {
            value = `(${value}`;
        }
        e.target.value = value;
    });

    btnSubmitLead.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (!inputName.value.trim()) {
            alert('Por favor, preencha seu nome.');
            inputName.focus();
            return;
        }

        if (!inputPhone.value.trim() || inputPhone.value.replace(/\D/g, '').length < 10) {
            alert('Por favor, preencha um número de WhatsApp válido.');
            inputPhone.focus();
            return;
        }

        formData.name = inputName.value.trim();
        formData.phone = inputPhone.value.trim();

        console.log('Dados Finais Coletados:', formData);
        
        // Advance to Success Screen
        goToStep(10);
    });

    // Step 10: Restart Form
    document.getElementById('btnRestart').addEventListener('click', () => {
        // Reset inputs
        inputAge.value = '';
        inputContributionYears.value = '';
        inputName.value = '';
        inputPhone.value = '';

        Object.keys(formData).forEach(key => formData[key] = '');

        goToStep(0);
    });
});
