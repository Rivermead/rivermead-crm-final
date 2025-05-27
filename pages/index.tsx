'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LeadIntakeForm() {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [mobile, setMobile] = useState('');
  const [claimType, setClaimType] = useState('');
  const [notes, setNotes] = useState('');

  const submitLead = async () => {
    const { error } = await supabase.from('leads').insert([
      {
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        email,
        telephone,
        mobile,
        claim_type: claimType,
        notes,
      },
    ]);

    if (error) {
      alert('Failed to submit lead');
    } else {
      alert('Lead submitted successfully!');
    }
  };

  return (
    <div>
      <h1>New Lead Intake – Rivermead CRM</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitLead();
        }}
      >
        <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <input type="text" placeholder="Middle Name" value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
        <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder="Telephone" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
        <input type="text" placeholder="Mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
        <input type="text" placeholder="Claim Type" value={claimType} onChange={(e) => setClaimType(e.target.value)} />
        <textarea placeholder="Additional Notes or Context" value={notes} onChange={(e) => setNotes(e.target.value)} />
        <button type="submit">Submit Lead</button>
      </form>
    </div>
  );
}



