import buttonData from './buttons.json'

type Button = {
    faceValue: string;
    colorClass: 'dark-gray' | 'light-gray' | 'orange',
    column?: 'zero'
}
export function Calculator() {
    return (
        <div className="container">
            <div className="calculator">
                <h1 className="header">
                    Calculator
                </h1>
                <div className="button-grid">
                    {buttonData.map((button: Button) => 
                        <div className={`${button.colorClass} ${button.column}`} key={`{${button.faceValue}`}> 
                            {button.faceValue}
                        </div>
                    )}    
                </div>
            </div>
        </div>
    )   
}   


