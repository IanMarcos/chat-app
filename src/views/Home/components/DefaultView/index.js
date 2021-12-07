import { useState } from 'react';
import { useInterval } from '../../../../helpers/customHooks';
import { FinalSlide } from './Slide';
import styles from './style.module.css';

function DefaultView() {

    const [index, setIndex] = useState(0);
    const [view, setView] = useState(<></>);
    
    const mongo = 'https://github.com/IanMarcos/personal-assets/blob/main/cv-app/mongo.png?raw=true';
    const contents = [
        'Hola!',
        'Esta App fue hecha con el stack MERN',
        mongo,
        mongo,
        'Para empezar, inicia sesión o regístrate'
    ];
    const textStyles = [styles.greeting, styles.longText, '', '', styles.longText];
    
    const renderSlide = () => {
        if(index >= 0 && index < contents.length){
            setView(<Slide info={contents[index]} slideStyle={textStyles[index]}/>);
            setIndex(index+1);
        } else {
            setView(<FinalSlide/>);
        } 
    }

    //Solución de Dan Abramov
    useInterval(renderSlide, 4000);

    /**Mi solución original
     * De esta forma no funciona el skip, pero no hay que esperar 4 segundos para que empieze la presentación
     * NOTA: index debe iniciar en cualquier valor diferente a 0*/

    // useEffect(() => {
    //     setIndex(0);
    // }, []);
    
    // useEffect(() => {
    //     //If para evitar que tome 4 segundos en iniciar la primera slide
    //     if(index === 0) {
    //         setView(<Slide info={contents[index]} slideStyle={textStyles[index]}/>);
    //         setIndex(index+1);
    //         return;
    //     }
    //     setTimeout(() => {
    //         //Cada 4 segundos se actualiza el indice (para poder recorrer los contenidos y estilos), y la vista
    //         if(index > 0 && index < contents.length){
    //             setView(<Slide info={contents[index]} slideStyle={textStyles[index]}/>);
    //             setIndex(index+1);
    //         } else {
    //             setView(<FinalSlide/>);
    //         }
    //     }, 4000);
    // }, [index]);

    const handleSkip = () => {
        setIndex(contents.length);
    }
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

    return(
        <>
            {view}
            <p className={styles.skip} onClick={handleSkip}>{"Saltar>>"}</p>
        </>);
}

export default DefaultView;
