export default{
    methods: {
        pageCalc(currentPage, total, pageSize = 10, pageUnit = 10) {
            let firstPage = 1;
            let lastPage =
                Math.floor(total / pageUnit) + (total % pageUnit == 0 ? 0 : 1);
            let startIdx = Math.floor((currentPage - 1) / pageSize) * pageSize + 1;
            let endIdx = startIdx + pageSize - 1;
            if (endIdx > lastPage) {
                endIdx = lastPage;
            }
            console.log(firstPage, lastPage, startIdx, endIdx);
            return {currentPage, firstPage, lastPage, startIdx, endIdx };
        },
    }
}

    