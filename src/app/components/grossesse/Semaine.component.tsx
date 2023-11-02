"use client";
export default function SemaineForm() {
    return (
        <div>
          <h1 className="mb-3">Semaine actuelle</h1>
          <h3 className="mb-3">Periode obstetrique</h3>
          <input type="hidden" name="start_week" value="{{ start_week }}" />
          <div className="border-double border-4 border-indigo-600 w-20 mb-3 h-20 "> 1 ere semaine</div>
        </div>
    )
          
}