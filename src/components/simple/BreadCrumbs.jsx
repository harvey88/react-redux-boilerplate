import React from 'react';
import {Link} from 'react-router-dom';
import RightArrowIcon from '../../assets/svg/right-arrow.svg';

const BreadCrumbs = (props) => {

    if (!props.items || !props.items.length) {
        return null;
    }
    return (
        <div className='breadcrumbs'>
            {props.items.map((item, key) => {
                if (key == props.items.length - 1) {
                    return <div key={key} className='breadcrumbs_name'>{item.name}</div>
                }
                return <React.Fragment key={key}>
                    <Link className='breadcrumbs_name breadcrumbs_name_link' to={item.path}>{item.name}</Link>
                    <RightArrowIcon className='breadcrumbs_arrow_icon'/>
                </React.Fragment>
            })}
        </div>
    )
}

export default BreadCrumbs;
