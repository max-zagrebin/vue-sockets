export default class Response {
    headers;
    dataEvent;
    data;

    popupProps;
    redirect;

    constructor(response) {
        // console.log("New Response created");
        // console.log(response);

        console.log("Check Response");
        console.log(response);
        let responseData = JSON.parse(response.data); //without stringify!!!
        console.log(responseData);
        this.popupProps = {
            display: false,
            messageText: null,
            buttonText: null
        };
        this.redirect = {
            is_present: false,
            name: null,
        };

        this.data = {
            is_present: false,
            dataset: null,
        };

        // this.popupProps = [
        //     display: null,
        //     headingText,
        //     messageText,
        //     buttonText
        // ]

        this.headers = responseData.headers;
        this.dataEvent = responseData.dataEvent;
        this.checkData(
            responseData.data,
            this.checkHeaders(this.headers, this.dataEvent));
    }

    checkHeaders(headers, dataEvent) {
        if (headers.popup) {
            this.popupProps.display = true;
            this.popupProps.headingText = "Внимание!";
            this.popupProps.messageText = dataEvent.popup.message;
            this.popupProps.buttonText = "Понятно";
            // console.log(this.popupProps);
        }
        if (headers.redirect) {
            // console.log(dataEvent.redirect.url);
            this.redirect.is_present = true;
            this.redirect.name = dataEvent.redirect.url;
        }
        return headers.error;
    }

    checkData(data, error) {
        if (error) return;
        this.data.is_present = true;
        this.data.dataset = data;
    }

    getData() {
        return this.data;

    }

    getHeaders(){
        return this.headers;
    }

    getHeadersEntry(entry_name){
        return this.headers[entry_name];
    }
    isDataPresent(){
        // console.log(this.data.is_present);
        return  this.data.is_present;
    }

    isRedirectPresent(){
        return  this.redirect.is_present;
    }

    getDatasetElem(elem_name){
        return JSON.parse(JSON.stringify(this.data.dataset[elem_name]));
    }
    getDataEventElem(elem_name){
        return JSON.parse(JSON.stringify(this.dataEvent[elem_name]));
    }
    getPopupProps() {
        return this.popupProps;
    }

    getRedirect() {
        return this.redirect;
    }
    getRedirectName(){
        return this.redirect.name;
    }
}
