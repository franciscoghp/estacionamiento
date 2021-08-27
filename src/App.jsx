import { LandingPage } from "./components/home/landingPage";
import styles from './title.module.css'

export function App(){
  return (
    <div>
      <header>
            <h1 className={styles.title}>Estacionamiento App</h1>
      </header>
      <main>
            <LandingPage/>
      </main>
    </div>
)
}