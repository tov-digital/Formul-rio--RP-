document.addEventListener('DOMContentLoaded', () => {
    // Webhook Endpoint
    const WEBHOOK_URL = 'https://n8n.srv1077266.hstgr.cloud/webhook/resolveprev-form';

    // Form Data State
    const formData = {
        gender: '',
        birthDate: '',
        inssContribution: '',
        workType: '',
        contributionYears: '',
        specialActivity: '',
        previousAttempt: '',
        name: '',
        phone: ''
    };

    let currentStep = 0;
    const totalQuestionSteps = 9; // Steps 1 to 9 (10 is success)
    let loadingTimer = null;

    // DOM Elements
    const backBtn = document.getElementById('backBtn');
    const progressWrapper = document.getElementById('progressWrapper');
    const progressBarFill = document.getElementById('progressBarFill');

    // Step Elements
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
        } else if (currentStep === 8) {
            // Loading Screen Step 8
            backBtn.style.display = 'none';
            progressWrapper.style.display = 'block';
            progressBarFill.style.width = '90%';
            startLoadingAnimation();
        } else if (currentStep === 10) {
            backBtn.style.display = 'none';
            progressWrapper.style.display = 'none';
        } else {
            backBtn.style.display = 'flex';
            progressWrapper.style.display = 'block';
            
            // Calculate progress percentage
            const percentage = 10 + (currentStep / totalQuestionSteps) * 90;
            progressBarFill.style.width = `${Math.min(percentage, 100)}%`;
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Step 8 Loading Animation
    function startLoadingAnimation() {
        const loadingBarFill = document.getElementById('loadingBarFill');
        const loadingPercentText = document.getElementById('loadingPercentText');
        
        let progress = 0;
        if (loadingTimer) clearInterval(loadingTimer);

        loadingBarFill.style.width = '0%';
        loadingPercentText.textContent = '0%';

        loadingTimer = setInterval(() => {
            progress += Math.floor(Math.random() * 5) + 2;
            if (progress >= 100) {
                progress = 100;
                clearInterval(loadingTimer);
                setTimeout(() => {
                    goToStep(9);
                }, 400);
            }
            loadingBarFill.style.width = `${progress}%`;
            loadingPercentText.textContent = `${progress}%`;
        }, 60);
    }

    // Step 0: Start Button
    document.getElementById('startBtn').addEventListener('click', () => {
        goToStep(1);
    });

    // Back Button Click Handler
    backBtn.addEventListener('click', () => {
        if (currentStep > 0 && currentStep <= 7) {
            goToStep(currentStep - 1);
        } else if (currentStep === 9) {
            goToStep(7);
        }
    });

    // Step 1: Gênero Cards
    document.querySelectorAll('#step1 .gender-card').forEach(card => {
        card.addEventListener('click', () => {
            const genderValue = card.dataset.gender;
            formData.gender = genderValue === 'mulher' ? 'Mulher' : 'Homem';
            goToStep(2);
        });
    });

    // Step 2: Data de Nascimento (DD/MM/AA)
    const inputBirthDate = document.getElementById('inputBirthDate');
    const btnStep2Next = document.getElementById('btnStep2Next');

    if (inputBirthDate) {
        inputBirthDate.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 6) value = value.slice(0, 6);

            if (value.length > 4) {
                value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4)}`;
            } else if (value.length > 2) {
                value = `${value.slice(0, 2)}/${value.slice(2)}`;
            }
            e.target.value = value;
        });

        inputBirthDate.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                btnStep2Next.click();
            }
        });
    }

    btnStep2Next.addEventListener('click', () => {
        const dateVal = inputBirthDate ? inputBirthDate.value.trim() : '';
        if (!dateVal || dateVal.length < 8) {
            alert('Por favor, informe sua data de nascimento completa (DD/MM/AA).');
            if (inputBirthDate) inputBirthDate.focus();
            return;
        }
        formData.birthDate = dateVal;
        goToStep(3);
    });

    // Step 3: INSS Options
    document.querySelectorAll('#step3 .option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const labelText = btn.querySelector('.option-label')?.textContent.trim() || btn.dataset.inss;
            formData.inssContribution = labelText;
            goToStep(4);
        });
    });

    // Step 4: Forma de Trabalho
    document.querySelectorAll('#step4 .option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const labelText = btn.querySelector('.option-label')?.textContent.trim() || btn.dataset.work;
            formData.workType = labelText;
            goToStep(5);
        });
    });

    // Step 5: Quantos anos contribuiu
    const inputContributionYears = document.getElementById('inputContributionYears');
    const btnStep5Next = document.getElementById('btnStep5Next');

    btnStep5Next.addEventListener('click', () => {
        const yearsVal = inputContributionYears.value.trim();
        if (yearsVal === '') {
            alert('Por favor, informe os anos de contribuição (ou uma estimativa).');
            inputContributionYears.focus();
            return;
        }
        formData.contributionYears = yearsVal;
        goToStep(6);
    });

    if (inputContributionYears) {
        inputContributionYears.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                btnStep5Next.click();
            }
        });
    }

    // Step 6: Atividade Especial
    document.querySelectorAll('#step6 .option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const labelText = btn.querySelector('.option-label')?.textContent.trim() || btn.dataset.special;
            formData.specialActivity = labelText;
            goToStep(7);
        });
    });

    // Step 7: Tentou Aposentar Antes
    document.querySelectorAll('#step7 .option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const labelText = btn.querySelector('.option-label')?.textContent.trim() || btn.dataset.attempt;
            formData.previousAttempt = labelText;
            // Go to Loading screen (Step 8)
            goToStep(8);
        });
    });

    // Step 9: Final Lead Form Submission via Webhook
    const btnSubmitLead = document.getElementById('btnSubmitLead');
    const inputName = document.getElementById('inputName');
    const inputPhone = document.getElementById('inputPhone');

    // Phone formatting mask helper
    if (inputPhone) {
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
    }

    btnSubmitLead.addEventListener('click', async (e) => {
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

        // UI Loading Feedback
        btnSubmitLead.disabled = true;
        const originalBtnText = btnSubmitLead.textContent;
        btnSubmitLead.textContent = 'ENVIANDO...';

        // Prepare Webhook Payload
        const payload = {
            nome: formData.name,
            whatsapp: formData.phone,
            genero: formData.gender,
            data_nascimento: formData.birthDate,
            contribuiu_inss: formData.inssContribution,
            forma_trabalho: formData.workType,
            anos_contribuicao: formData.contributionYears,
            atividade_especial: formData.specialActivity,
            tentou_aposentar_antes: formData.previousAttempt,
            data_envio: new Date().toISOString()
        };

        console.log('Enviando dados para o Webhook:', payload);

        try {
            await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
        } catch (error) {
            console.error('Erro ao enviar dados para o Webhook:', error);
        } finally {
            btnSubmitLead.disabled = false;
            btnSubmitLead.textContent = originalBtnText;
            // Advance to Success Screen (Step 10)
            goToStep(10);
        }
    });

    // Step 10: Restart Form
    document.getElementById('btnRestart').addEventListener('click', () => {
        if (inputBirthDate) inputBirthDate.value = '';
        if (inputContributionYears) inputContributionYears.value = '';
        if (inputName) inputName.value = '';
        if (inputPhone) inputPhone.value = '';

        Object.keys(formData).forEach(key => formData[key] = '');

        goToStep(0);
    });
});
