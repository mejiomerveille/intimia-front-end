import Link from "next/link";
export default function InfoGrossesseForm() {
    return(
        <html lang="en">
        <head>
            {/* <Link href="https://fonts.googleapis.com/icon?family=Material+Icons"rel="stylesheet"></Link> */}
        </head>
        <div>
            <div>
            <span className="">Arrow Back</span><h1>Mode Grossesse</h1>
                <h2>Pourquoi enregistrer votre grossesse sur Intimia ?</h2>
            </div>
            <div>
                <div>
                    Voir le compte a rebours jusqua la naissance du bebe
                </div>
                <div>
                    Recevez chaque jour des conseils sante et des informations sur le developpement de votre bebe.
                </div>
                <div>
                    Suivre le poids, la nutrition et les autres parametres relatifs au mode de vie
                </div>
            </div>
            <button>
                Enregistrer la grossesse
            </button>
        </div>
        </html>
    );
}