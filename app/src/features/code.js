import { supabase } from '../supabaseClient'
import axios from 'axios';

// TODO: move this elsewhere
const lambdaURL = "https://bq7ler0dkb.execute-api.us-east-1.amazonaws.com/default/ai-arena-test"
const lambdaKey = "bXPvvyL9fC7NnSE4x5ZwX2Hd7h2CIzqaqSJu0Xta"

export async function submitCodeLambda(code, auth, callback) {

  axios.defaults.withCredentials = true

  let data = {
    id: code.id,
    owner : auth.session.user.id,
    code : code,
    userkey : auth.session.access_token
  }

  // IMPORTANT: API gateway needs all of these headers in its 'Access-Control-Allow-Headers' 
  // in order to work with this request
  // 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token, X-PINGOTHER, Accept'
  fetch(lambdaURL, {
    method: 'POST',
    headers: {
        'Access-Control-Request-Method' : 'POST',
        'Access-Control-Request-Headers': 'X-PINGOTHER, Content-Type',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-api-key' : lambdaKey
    },
    body: JSON.stringify(data)
  })
   .then(response => response.json())
   .then(result => {console.log(result); callback(result)}) // Read result
   .catch((error) => {console.log(error); callback({ 'message' : { 'status' : 'Server Error, try again.'}})})
}

/**
 * Submit code for this user to the database
 */
export async function submitCode(code, auth) {
    
    const { data, error } = await supabase
    .from('battle_code')
    .upsert([
        { 
          id : code.id,
          name: code.name, 
          owner: auth.session.user.id,
          code: {
            "name" : code.name,
            "baseStart" : code.baseStart,
            "baseUpdate" : code.baseUpdate,
            "shipStart" : code.shipStart,
            "shipUpdate" : code.shipUpdate,
          },
        },
    ])
}

/**
 * Get a specific piece of code by name
 */
export async function getCode(name) {
        
    let { data: TacticalCode, error } = await supabase
    .from('battle_code')
    .select('*')
    .eq('name', name) // filtering

    return TacticalCode
}

/**
 * Get a specific piece of code by id
 */
export async function getCodeByID(id) {
        
  let { data: TacticalCode, error } = await supabase
  .from('battle_code')
  .select('*')
  .eq('id', id) // filtering

  return TacticalCode
}

/**
  * Select the code for a given user 
 */
export async function getUserCode(auth) {
        
  console.log(auth)
  let { data: TacticalCode, error } = await supabase
  .from('battle_code')
  .select('*')
  .eq('owner', auth.session.user.id)
  return TacticalCode

}

/**
 * Delete a specific piece of code by id
 */
export async function deleteCode(id) {
  let { data: battle_code, error } = await supabase
  .from('battle_code')
  .delete()
  .eq('id', id) // filtering
}