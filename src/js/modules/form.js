const getFormData = () => {
    const subscribeForm = document.querySelector('.subscribe__form');
    subscribeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const valueInput = formData.get('email').trim();
        console.log(valueInput);
        alert('Подписка оформлена!')
        subscribeForm.reset();
    });
};

export default getFormData;