"use client";
export default function InfoGrossesseForm() {
    return(
        <div className="instruction">
            <div className="card text-white bg-success mb-3" >
                <div className="card-header">
                    <h1>Exercice de Kegel</h1>
                </div>
                <div className="card-body">
                    <h2 className="card-title">une serie d'exercice pour renforcer les muscles pelviens</h2>
                    <h5 className="card-text"><button type="submit">Lancer</button></h5>
                </div>
            </div>
            <div className="card text-white bg-red-600 mb-3" >
                <div className="card-header">
                    <h1>A propos du bebe</h1>
                </div>
                <div className="card-body">
                    <h2 className="card-title">Embryon</h2>
                    <h5 className="card-text">Some quick example text to build on the card title and make up the bulk of the card's
                        content.</h5>
                </div>
            </div>
            <div className="card text-dark bg-warning mb-3" >
                <div className="card-header">
                    <h1>A propos de vous</h1>
                </div>
                <div className="card-body">
                    <h2 className="card-title">Maman</h2>
                    <h5 className="card-text">Est-ce que vous savez que lorsque vous vous rendez chez le medecin et que vous pensez etre
                        enceinte de 5 ou 6 semaines , vous etes en realite ...</h5>
                </div>
            </div>
            <div className="card text-dark bg-info mb-3" >
                <div className="card-header">
                    <h1>Nutrition</h1>
                </div>
                <div className="card-body">
                    <h2 className="card-title">Danger card title</h2>
                    <h5 className="card-text">Cette premiere semaine est le point de depart. Pendant cette periode,vous devez adopter un
                        regime alimentaire permettant d'assurer les meilleurs...</h5>
                </div>
            </div>
            <div className="card text-dark bg-orange-600 mb-3">
                <div className="card-header">
                    <h1>Recommande</h1>
                </div>
                <div className="card-body">
                    <h2 className="card-title">Conseil recommande</h2>
                    <h5 className="card-text">Some quick example text to build on the card title and make up the bulk of the card's
                        content.</h5>
                </div>
            </div>
        </div>
        
    )
}