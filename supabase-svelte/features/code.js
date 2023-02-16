import { supabase } from '../src/supabaseClient'

/**
 * Submit code for this user to the database
 */
export async function submitCode(code, session) {
    
    const { data, error } = await supabase
    .from('TacticalCode')
    .insert([
        { 
          name: code.name, 
          owner: session.session.user.id, // TODO: should be easier to get user id
          code: {
            'BaseStart' : code.BaseStart,
            'BaseUpdate' : code.BaseUpdate,
            'ShipStart' : code.ShipStart,
            'ShipUpdate' : code.ShipUpdate
          },
        },
    ])
}

/**
 * Get the code for a given user
 */
export async function getCode(name) {
        
    let { data: TacticalCode, error } = await supabase
    .from('TacticalCode')
    .select('*')
    .eq('name', 'Second Code') // filtering

    console.log(TacticalCode)
}