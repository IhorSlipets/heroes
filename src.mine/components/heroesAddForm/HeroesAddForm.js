import {useHttp} from '../../hooks/http.hook';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { heroAdding, filtersFetching, filtersFetched, filtersFetchingError } from '../../actions';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const [heroName, setHeroName] = useState('');
    const [heroDesciption, setHeroDescription] = useState('');
    const [heroElement, setHeroElement] = useState('');
    const { request } = useHttp();
    const {filters, filtersLoadingStatus} = useSelector(state => state);

    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        const newHero = {
            id: uuidv4(),
            name: heroName,
            description: heroDesciption,
            element: heroElement    
        }
        

        request("http://localhost:3001/heroes", 'POST', JSON.stringify(newHero))
            .then(data => console.log(data, 'adding'))
            .then(dispatch(heroAdding(newHero)))
            .catch(err => console.log(err));

        setHeroName('');
        setHeroDescription('');
        setHeroElement('');
    }

    useEffect(() => {
        dispatch(filtersFetching());
        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()))
    }, []);

    // console.log(filters);

    const options = (filters, status) => {
        
        if (status === 'loading') {
            return <option >filters is loading</option>
        } else
            if (status === 'error') {
                return <option >error is happens</option>
            } else { 
                if (filters.length === 0) { return <option >no filters in storage</option> }
                else {
                    return filters.map((item, i) => {
                        if (item === 'all') return;
                        return <option key={i} value={item.name}>{item.name}</option>                    
                    })
                }
            }   
    }
    
    const optionList = options(filters, filtersLoadingStatus);
    

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Как меня зовут?"
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value) } />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text"
                    className="form-control"
                    id="text"
                    placeholder="Что я умею?"
                    style={{ "height": '130px' }}
                    value={heroDesciption}
                    onChange={(e) => setHeroDescription(e.target.value) }/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={heroElement}
                    onChange={(e) => setHeroElement(e.target.value) }>
                    <option value="">Я владею элементом...</option>
                    {optionList}
                    
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;