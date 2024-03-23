function FlexAuto({children, classNameContainer, classNameTop}) {
    return (
        <div className={`${classNameTop} flex`}>
            <div className="flex-auto"></div>
            <div className={`${classNameContainer} container`} >
                {children}
            </div>
            <div className="flex-auto"></div>
            
        </div>
    )
}

export default FlexAuto
