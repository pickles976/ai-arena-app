import { supabase } from '../supabaseClient'
import axios from 'axios';

export async function submitCodeLambda(code, session) {

  axios.defaults.withCredentials = true

  // TODO: move this elsewhere
  const lambdaURL = "http://localhost:9000/2015-03-31/functions/function/invocations"

  let data = {
    id: code.id,
    owner : session.session.user.id,
    code : code,
    userkey : session.session.access_token
  }

  fetch(lambdaURL, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
   .then(response => console.log(response.json()))
   .then(response => console.log(JSON.stringify(response)))
}

/**
 * Submit code for this user to the database
 */
export async function submitCode(code, session) {
    
    const { data, error } = await supabase
    .from('TacticalCode')
    .upsert([
        { 
          id : code.id,
          name: code.name, 
          owner: session.session.user.id, // TODO: should be easier to get user id
          code: {
            "name" : code.name,
            "baseStart" : code.baseStart,
            "baseUpdate" : code.baseUpdate,
            "shipStart" : code.shipStart,
            "shipUpdate" : code.shipUpdate,
          },
        },
    ])

    console.log(code)
}

/**
 * Get a specific piece of code by id
 */
export async function getCode(name) {
        
    let { data: TacticalCode, error } = await supabase
    .from('TacticalCode')
    .select('*')
    .eq('name', 'Second Code') // filtering

    console.log(TacticalCode)
}

/**
 * Get the code for a given user
 */
export async function getUserCode() {
        
  let { data: TacticalCode, error } = await supabase
  .from('TacticalCode')
  .select('*')
  return TacticalCode

}

/**
 * Delete a specific piece of code by id
 */
export async function deleteCode(id) {
  let { data: TacticalCode, error } = await supabase
  .from('TacticalCode')
  .delete()
  .eq('id', id) // filtering
}