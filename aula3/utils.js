const takeFromArrayWhereIndex = (values, shouldTake) => {
    const res = []

    return values.filter((_, index) => shouldTake(index))
}

export default { takeFromArrayWhereIndex }