import React, {useState} from 'react'
import './MovieRow.css'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import AddIcon from '@material-ui/icons/Add';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ReactTooltip from 'react-tooltip';

const MovieRow =({title, items})=> {
    const [scrollX, setScrollX] = useState(0)
    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth/2);
        if(x > 0){
            x = 0;
        }
        setScrollX(x);
    }
    const handleRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth/2);
        let listw=items.results.length * 150;
        if(window.innerWidth - listw > x){
            x = (window.innerWidth - listw) - 60
        }
        setScrollX(x); 
    }

    return(
        <div className="movieRow">
            <h2>{title}</h2>
            <div className="movieRow--left" onClick={handleLeftArrow}>
                <NavigateBeforeIcon style={{fontSize: 50}}></NavigateBeforeIcon>
            </div>
            <div className="movieRow--right" onClick={handleRightArrow}>
                <NavigateNextIcon style={{fontSize: 50}}></NavigateNextIcon>
            </div>
            <div className="movieRow--listarea">
                <div className="movieRow--list" style={{
                    marginLeft: scrollX,
                    width: items.results.length * 150
                }}>
                    {items.results.length > 0 && items.results.map((item, key)=>{
                        return(
                            <div key={key} className="movieRow--item">
                             <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt="" />
                             
                             
                                <div className="movieRow--itemicons">
                                <div className="movieRow--icon" data-tip data-for="playTip"><PlayArrowIcon style={{fontSize: 20}}/></div>
                                <div className="movieRow--icon" data-tip data-for="addTip"><AddIcon style={{fontSize: 20}}/></div>
                                <div className="movieRow--icon" data-tip data-for="likeTip"><ThumbUpIcon style={{fontSize: 20}}/></div>
                                <div className="movieRow--icon" data-tip data-for="unlikeTip"><ThumbDownIcon style={{fontSize: 20}}/></div>
                                <div className="movieRow--icon"><ExpandMoreIcon style={{fontSize: 20}}/></div>

                                <ReactTooltip id="playTip" place="top" effect="solid">
                                    Assistir
                                </ReactTooltip>
                                <ReactTooltip id="addTip" place="top" effect="solid">
                                    Adicionar a minha lista
                                </ReactTooltip>
                                <ReactTooltip id="likeTip" place="top" effect="solid">
                                    Gostei
                                </ReactTooltip>
                                <ReactTooltip id="unlikeTip" place="top" effect="solid">
                                    Não gostei
                                </ReactTooltip>

                                </div> 

                            </div>
                            )
                        }
                        )}
                </div>
            </div>
        </div>
    )
}
export default MovieRow