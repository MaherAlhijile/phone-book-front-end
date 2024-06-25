const person = ({name, number}) => {
    const nameToShow = !(name) ? "Person":  name
    const numberToShow = !(number) ? "0000000000":  number

    return <span>{nameToShow} {numberToShow}</span>
}

export default person 