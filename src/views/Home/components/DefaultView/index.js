import { useEffect, useState} from 'react'
import styles from './style.module.css';
// import Slide from './Slide';
import mongo from './../../../../assets/mongo.png'

function DefaultView() {

    const [index, setIndex] = useState(-1);
    const [view, setView] = useState(<></>);
    const contents = [
        'Hola!',
        'Esta App fue hecha con el stack MERN',
        mongo
    ];
    const textStyles = [styles.slide0, styles.slide1, styles.slide2];
    
    useEffect(() => {
        setIndex(0);
    }, []);
    
    /* eslint-disable */
    useEffect(() => {
        //If para evitar que tome 4 segundos en iniciar la primera slide
        if(index === 0) {
            setView(<Slide info={contents[index]} slideStyle={textStyles[index]}/>);
            setIndex(index+1);
            return;
        }
        setTimeout(() => {
            //Cada 4 segundos se actualiza el indice (para poder recorrer los contenidos y estilos), y la vista
            if(index < contents.length){
                setView(<Slide info={contents[index]} slideStyle={textStyles[index]}/>);
                setIndex(index+1);
            } else {
                setView(<div className={styles.finalSlide}>dasfasdg</div>);
            }
        }, 4000);
    }, [index]);
    /* eslint-enable */

    //Por algún motivo, cuando el componente es importado, la animación solo funciona la primera vez
    function Slide({info, slideStyle}) {
        return (
            <div className={`${styles.presentation} ${slideStyle}`}>
                {!info.includes('.png')? info: <img src={info} alt='Sorry uwu'/>}
            </div>
        )
    }

    return(
        <>
            {view}
        </>
    )
}

export default DefaultView;
