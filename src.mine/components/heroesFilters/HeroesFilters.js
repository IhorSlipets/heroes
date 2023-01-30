import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeFilter } from '../../actions';
import Spinner from '../spinner/Spinner';
import classNames from 'classnames';
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const { filters, filtersLoadingStatus, filterActive } = useSelector(state => state);
    const dispatch = useDispatch();
    
    const renderClass = (filters) => {
        if (filtersLoadingStatus === 'error') {
            return <div>'error'</div>
        } 
        if (filtersLoadingStatus === 'loading') {
            return <Spinner/>
        } else
            if (filters.length === 0) {
            return <div>'there is no filters present'</div>
            }
        if (filters.length > 0) {
            return filters.map((item, i) => {
                let newClass = classNames(item.color);
                if (filterActive === item.name) {
                    newClass = classNames(item.color,{active: true})
                } else {newClass=classNames(item.color,{active: false})}
                return <button key={i} className={newClass} value={item.name} onClick={(e) => dispatch(activeFilter(e.target.value))}>{item.name}</button>
            })
        }
         
    } 

    const content = renderClass(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {/* <button className="btn btn-outline-dark active">Все</button>
                    <button className="btn btn-danger">Огонь</button>
                    <button className="btn btn-primary">Вода</button>
                    <button className="btn btn-success">Ветер</button>
                    <button className="btn btn-secondary">Земля</button> */}
                    {content}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;