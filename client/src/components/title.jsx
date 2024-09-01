function Title(props){
  let count =0;
    return(
        <div>
              <div className=" flex justify-between items-center my-3 mx-1" ><label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="title-0"
              >
                Title
              </label>
             {props.type!="main" && <div><i onClick={()=>{props.deleteFunc(props.ind)}} class="fa-solid fa-trash"></i></div>}
                </div>
              <input  
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="title-0"
                placeholder="Enter a title"
                onChange={(e)=>{props.changeFunc(e , props.ind)}}
                  name='title'
              />
    </div>
    )
}

export default Title