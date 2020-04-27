const app=new Vue({
    el:'#app',
    data: {
        titulo:"Ingrese el criterio de busqueda",
        jsonQuery:'',
        jsonQuery2:'',
        searchName:'',
        jsonString:'{}',
        jsonString2:'{}',
        arraySortContent:[],
        arrayJsonContent2:[],
        status:false,
        apiUrl:'https://localhost:44337/api/Query'
    },
    methods:{
        query(){
            this.$http.get(this.apiUrl).then(response => {
      
                // get body data

                 this.jsonString = JSON.stringify(response.body.results);

                this.jsonQuery=JSON.parse(this.jsonString);
            return 
              }, response => {
                // error callback
              });
        },
        queryPost(){

            this.$http.post(this.apiUrl,{nombre:this.searchName},
                {
                    headers: {
                      'Content-Type': 'application/json;'
                    }}
                ).then(response => {
      
                // get body data
                  
                this.jsonString=JSON.parse(response.body.source);
                this.jsonQuery=this.jsonString.results;
                this.arraySortContent=this.sortQuery(this.jsonQuery);

                this.jsonQuery2='';
                this.arrayJsonContent2=[];
                this.jsonQuery2=JSON.parse(response.body.source2);
                  //console.log(this.jsonQuery2);
                  this.jsonQuery2.forEach(content => {
                    //console.log(content.score);
                    
                    this.arrayJsonContent2.push(content.show);

                  });
                  this.arraySortContent2=this.sortQuery2(this.arrayJsonContent2);
                  this.status=true;
            return 
              }, response => {
                // error callback

                console.log(response.data)
              });

        },
        sortQuery(arrayQuery){
          return arrayQuery.sort(function(a, b) 
          { 
            if(a.trackName < b.trackName) return -1;
          if(a.trackName > b.trackName) return 1;
          return 0;
      }
        );
          },
          sortQuery2(arrayQuery){
            return arrayQuery.sort(function(a, b) 
            { 
              if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0;
        }
          );
          }

    },
    computed:{
      computedFonksiyon() {
        this.jsonQuery.sort(function(x, y) {
          return y.trackName- x.trackName;
        });
        return this.jsonQuery;
      }
    }

    }) 
