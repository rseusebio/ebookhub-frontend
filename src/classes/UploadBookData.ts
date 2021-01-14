interface UploadBookResponse
{
    filename:        string;
    size:            number;
    type:            string;
    encoding:        string;

    statusCode:      number;
    elapsedTime:     number;

    uploadDate:      Date;
}



interface UploadBookData 
{
    uploadBook: UploadBookResponse
}

export default UploadBookData;