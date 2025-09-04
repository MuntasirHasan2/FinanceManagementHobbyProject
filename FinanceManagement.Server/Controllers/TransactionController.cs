using DotNetEnv;
using FinanceManagement.Server.Models;
using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using System.Data;
using System.Net.Http;
using System.Text.Json;
using FinanceManagement.Server.Entities;

namespace FinanceManagement.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class TransactionController : Controller
{
    private readonly ITransactionService _transactionService;
    private readonly ITransactionRecurringService _transactionRecurringService;

    public TransactionController(ITransactionService transactionService, ITransactionRecurringService transactionRecurringService)
    {
        _transactionService = transactionService;
        _transactionRecurringService = transactionRecurringService;

    }

    [HttpGet("List")]
    public async Task<IActionResult> GetAsync()
    {
        return await _transactionService.ListAllAsync();
    }

    [Route("ListTransactionRecurring")]
    [HttpGet]
    public async Task<IActionResult> GetAllTransaction()
    {
        return _transactionRecurringService.ListAllAsync();
    }

    [Route("GetTransaction")]
    [HttpPost]
    public async Task<IActionResult> GetTransaction(int userId)
    {
        return await _transactionService.GetByUserIdAsync(userId);
    }

    [Route("GetTransactionRecurring")]
    [HttpPost]
    public async Task<IActionResult> GetTransactionRecurring(int id)
    {
        return await _transactionRecurringService.GetByUserIdAsync(id);
    }

    [HttpPost("AddBulkTransaction")]
    public async Task<IActionResult> BulkRequestTransaction(List<TransactionRequest> listTransaction, List<TransactionRecurringRequest> listTransactionRecurring)
    {
        if (await _transactionService.AddList(listTransaction))
        {
            return Created();
        }
        return BadRequest("Error while Adding Transaction!");
    }

    [HttpPost("AddBulkTransactionRecurring")]
    public async Task<IActionResult> BulkRequestTransaction(List<TransactionRequest> listTransaction, List<TransactionRecurringRequest> listTransactionRecurring)
    {
        if (await _transactionRecurringService.AddList(listTransactionRecurring))
        {
            return Created();
        }
        return BadRequest("Error while Adding Transaction Recurring");
    }


}

