import React from 'react';

const Form: React.FC = () => {
    // TODO: implement form logic
    return (
        <section>
            <h3>Создать/Редактировать запуск Cloud Run Scenario</h3>
            <form>
                {/* form fields here */}
                <button type="submit">Сохранить</button>
                <button type="button">Отмена</button>
            </form>
        </section>
    );
};

export {Form};
