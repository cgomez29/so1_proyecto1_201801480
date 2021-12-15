import '../../Styles/Card/card.scss'

interface CardProps {
    title: string;
    body: string;
}

export const Card = ({ title, body }: CardProps) => {
    return (
        <div className="card" >
            <div className="header" > {title} </div>
            <div className="body" >  {body} </div>
            <div className="footer" >  </div>
        </div>
    )
}
