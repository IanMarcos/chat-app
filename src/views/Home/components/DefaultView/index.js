import { useEffect, useState} from 'react'
import styles from './style.module.css';
import { FinalSlide } from './Slide';
import mongo from './../../../../assets/mongo.png'

function DefaultView() {

    const [index, setIndex] = useState(-1);
    const [view, setView] = useState(<></>);
    const contents = [
        'Hola!',
        'Esta App fue hecha con el stack MERN',
        mongo,
        mongo,
        'Para empezar, inicia sesión o regístrate'
    ];
    const textStyles = [styles.greeting, styles.longText, '', '', styles.longText];
    
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
            if(index > 0 && index < contents.length){
                setView(<Slide info={contents[index]} slideStyle={textStyles[index]}/>);
                setIndex(index+1);
            } else {
                setView(<FinalSlide/>);
            }
        }, 4000);
    }, [index]);
    /* eslint-enable */

    //Por algún motivo, cuando el componente es importado, la animación solo funciona la primera vez
    function Slide({info, slideStyle}) {
        if( info.includes('.png') ){
            return (
                <div className={styles.presentation}>
                    <img src={info} alt='Sorry uwu' className={"img-fluid"}/>
                </div>
            ) 
        }
        return (
            <div className={`${styles.presentation} ${slideStyle}`}>
                {info}
            </div>
        )
    }

    return(<>{view}</>);
}

export default DefaultView;
