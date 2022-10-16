import React from 'react'

const Score = (props) => {

    return (
        <div className="score-panel">
                        <div className="teams-info" id="teams-info">
                                <div className="container row">
                                    <div className="col-left">
                                        <div className="cell">Values</div>
                                        <div className="cell">Kills</div>
                                        <div className="cell">Deaths</div>
                                        <div className="cell">Metal</div>
                                        <div className="cell">Energy</div>
                                    </div>
                                    <div className="col-middle">
                                        <div className="cell">Team 0</div>
                                        <div className="cell" id='team0-kills'>{props.score['team 0'].kills}</div>
                                        <div className="cell" id='team0-deaths'>{props.score['team 0'].deaths}</div>
                                        <div className="cell" id='team0-metal'>{props.score['team 0'].metal}</div>
                                        <div className="cell" id='team0-energy'>{props.score['team 0'].energy}</div>
                                    </div>
                                    <div className="col-right">
                                        <div className="cell">Team 1</div>
                                        <div className="cell" id='team1-kills'>{props.score['team 1'].kills}</div>
                                        <div className="cell" id='team1-deaths'>{props.score['team 1'].deaths}</div>
                                        <div className="cell" id='team1-metal'>{props.score['team 1'].metal}</div>
                                        <div className="cell" id='team1-energy'>{props.score['team 1'].energy}</div>
                                    </div>
                                </div>
                        </div>
                    </div>

    )
}

export default Score