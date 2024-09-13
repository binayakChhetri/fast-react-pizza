import { Link } from "react-router-dom"

function Button({children, disabled,to,type, onClick}) {
    
    const base = "uppercase font-semibold bg-yellow-400 text-stone-800 text-sm inline-block rounded-full tracking-wide hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 transition-colors duration-300 disabled:cursor-not-allowed";
    const styles = {
      primary: base + ' px-4 py-3 md:px-6 md:py-4',
      small:base + ' px-4 py-2  md:px-5 md:py-2.5 text-xs',
      secondary: " text-sm px-4 py-2.5 md:px-6 md:py-3.5 uppercase font-semibold text-stone-400 text-sm inline-block rounded-full tracking-wide hover:bg-stone-300 hover:text-stone-800 border-2 border-stone-200 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 transition-colors duration-300 disabled:cursor-not-allowed",
      round: base + ' px-2.5 py-1 md:px-3.5 md:py-2 text-sm',
    }

    if (to) return <Link to={to} className={styles[type]}>{children}</Link>

    if (onClick) return (
        <button disabled={disabled} className={styles[type]} onClick={onClick}>
            {children}
        </button>
    )

    return (
        <button disabled={disabled} className={styles[type]}>
            {children}
        </button>
    )
}

export default Button
