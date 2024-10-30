import { StyleSheet } from 'react-native';
import { Container } from 'react-native-flex-grid';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    backgroundColor: '#81c257',
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
        
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#81c257',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
},
  title: {
    color: '#fff',
    fontStyle:'italic',
    fontWeight: 'bold',
    textDecorationLine:'underline',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
  },
  author: {
    color: '#000000',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
    flex: 1
  },
  gameboard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10
  },
  row: {
    marginTop: 20,
    padding: 10
  },
  flex: {
    flexDirection: "row"
  },
  button: {
    justifyContent:'center',
    flexDirection: "row",
    backgroundColor: "#000000",
    width: 115,
    borderRadius: 15,
    marginTop: 35
  },
  buttonText: {
    color:"#2B2B52",
    fontSize: 20
  },
  nametext: {
    margin: 20,
   justifyContent:'center',
   alignItems:'center'
  },
  noppa:{
    marginTop:15,
    marginBottom: 30,
    width:200,
    height:200,
    justifyContent:'center',
    alignItems:'center',
  },
  tervetuloa: {
    fontSize: 25,
    marginBottom: 15,
    textAlign:'center',
    fontStyle:'italic'

  },
  cardContainer: {
    width: 350,
    height: 220,
    justifyContent:'center',
    alignItems: 'center',
    alignSelf:'center',
    backgroundColor:'#81c257',
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  valmisNappi:{
    width: 150,
    marginTop: 20,
    alignSelf:'center',
    backgroundColor:'black'
},
rulesBox: {
  padding: 15,
  borderWidth: 1,
  borderRadius: 10,
  justifyContent:'center',
  width: 380,
  height: 400,
  alignSelf:'center',
  backgroundColor:'#d4f59f',
},
rulesTitle: {
  flex: 1,
  marginTop: 5,
  alignSelf:'center',
  fontSize: 20,
  fontWeight:'300',
  textAlign:'center',
  fontStyle:'bold'
},
rules:{
  fontSize:15,
  marginBottom: 5
},
onnea: {
  flexDirection:'row',
  width: 200,
  alignSelf:'left',
  justifyContent:'column'
},
//Game Board styles
throwStatus:{
  fontSize: 20
},
throwButton: {
  backgroundColor: '#81c257',  
  paddingVertical: 12,         
  paddingHorizontal: 20,       
  borderRadius: 10,            
  alignItems: 'center',        
  marginTop: 15               
},
throwButtonText: {
  fontSize: 16,                
  color: '#fff',               
  fontWeight: 'bold'         
},
newGame: {
  backgroundColor: '#81c257',  
  paddingVertical: 12,         
  paddingHorizontal: 20,      
  borderRadius: 10,            
  alignItems: 'center',        
  marginTop: 30
},
StartNewGameText: {
  fontSize: 16,                
  color: '#fff',               
  fontWeight: 'bold' 
},
SavePointText:{
  fontSize: 16,                
  color: '#fff',              
  fontWeight: 'bold' 
}
});